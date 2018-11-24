import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import styles from './GoalModal.css'
import { getUser } from '../../Survey/UsersReducer'
import { addUserRequest } from '../../Survey/UsersActions'
import { addGoalRequest, closeGoalModal } from '../GoalsActions'
import { dropdownOptions } from '../../../util/constants'

class GoalModal extends Component {
  constructor (props) {
    super(props)
    this.state = this.resetState(props)
  }

  componentWillMount () {
    this.renderGoalName = this.renderGoalName.bind(this)
    this.enterYearAmount = this.enterYearAmount.bind(this)
    this.addYear = this.addYear.bind(this)
    this.removeYear = this.removeYear.bind(this)
    this.saveGoal = this.saveGoal.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { goalToEdit } = this.props

    if (goalToEdit && goalToEdit !== prevProps.goalToEdit) {
      this.loadExistingGoal(this.goalToEdit)
    }
  }

  resetState (props, resetAll) {
    const { goalToEdit } = props
    const currentYear = new Date().getFullYear()
    const selectedOption = goalToEdit && dropdownOptions.find(o => o.label === goalToEdit.name)

    return {
      customGoal: false,
      goalName: '',
      selectedOption: resetAll ? null : selectedOption,
      selectedType: null,
      description: resetAll ? '' : (goalToEdit && goalToEdit.description) || '',
      updateSurvey: false,
      years: [{
        year: currentYear,
        value: ''
      }, {
        year: currentYear + 1,
        value: ''
      }, {
        year: currentYear + 2,
        value: ''
      }]
    }
  }

  loadExistingGoal () {
    const { goalToEdit } = this.props
    const selectedOption = goalToEdit && dropdownOptions.find(o => o.value === goalToEdit.type)
    const sortedYears = goalToEdit.years
      .filter(y => y && y[0])
      .map(y => y[0])
      .sort((a, b) => a - b)
    const currentYear = new Date().getFullYear()
    const firstYear = sortedYears && sortedYears.length && sortedYears[0].year && sortedYears[0].year < currentYear
      ? sortedYears[0].year
      : currentYear
    const lastYear = sortedYears && sortedYears.length && sortedYears[sortedYears.length - 1].year
    const years = []

    for (let i = firstYear; i <= lastYear; i++) {
      let exists = sortedYears.find(y => y.year === i)
      years.push({ year: i, value: exists ? exists.value : '' })
    }

    this.setState({
      customGoal: false,
      selectedOption: selectedOption,
      selectedType: null,
      description: goalToEdit && goalToEdit.description,
      years
    })
  }

  saveGoal () {
    const { selectedOption, years, description, updateSurvey, customGoal, goalName, selectedType } = this.state
    const { dispatch, goalToEdit, user } = this.props
    const goal = {
      _id: goalToEdit && goalToEdit._id,
      name: !customGoal ? selectedOption.label : goalName,
      type: !customGoal ? selectedOption.value : selectedType,
      description,
      years: years
        .filter(y => y.year && y.value)
        .map(y => ({ year: y.year, value: parseInt(y.value, 10) }))
    }

    if (updateSurvey) {
      const userSuveyUpdate = selectedOption.userSurveyArea === 'debt'
        ? user && user.debt
          ? [...user.debt, selectedOption.value]
          : [selectedOption.value]
        : selectedOption.userSurveyValue

      dispatch(addUserRequest({
        ...user,
        [selectedOption.userSurveyArea]: userSuveyUpdate
      }))
    }

    dispatch(addGoalRequest(goal))
    dispatch(closeGoalModal())

    const newState = this.resetState(this.props, true)
    this.setState(newState)
  }

  enterYearAmount (event, item) {
    const { years } = this.state
    const value = event.target.value
    const newYears = [...years]
    const currYear = newYears.find(ny => ny.year === item.year)

    if (currYear) {
      currYear.value = value
      this.setState({ years: newYears })
    }
  }

  removeYear (year) {
    const { years } = this.state
    const newYears = years.filter(ny => ny.year !== year.year)

    this.setState({ years: newYears })
  }

  addYear () {
    const { years } = this.state
    const lastYear = years && years.length
      ? years[years.length - 1].year
      : new Date().getFullYear()

    const newYears = [...years]
    newYears.push({
      year: lastYear + 1,
      amount: ''
    })

    this.setState({ years: newYears })
  }

  renderGoalName () {
    const { updateSurvey, customGoal, goalName, selectedType } = this.state
    const onChange = (event) => {
      const value = event.target.value
      this.setState({ selectedType: value })
    }

    return (
      <div className='form-group'>
        <h6>Goal Name</h6>
        <div className={`btn-group btn-group-sm ${styles.buttonGroup}`} role='group' aria-label='Goal Type'>
          <button
            type='button'
            className={`btn ${!customGoal ? 'btn-secondary' : 'btn-light'} ${styles.goalTypeButton}`}
            onClick={() => this.setState({ customGoal: false })}
          >
            From List
          </button>
          <button
            type='button'
            className={`btn ${customGoal ? 'btn-secondary' : 'btn-light'} ${styles.goalTypeButton}`}
            onClick={() => this.setState({ customGoal: true })}
          >
            Create My Own
          </button>
        </div>
        {!customGoal &&
          <Select
            className={styles.goalNameDropdown}
            placeholder='Type to search'
            value={this.state.selectedOption}
            onChange={(selectedOption) => {
              this.setState({ selectedOption })
            }}
            options={dropdownOptions}
          />
        }
        {customGoal &&
          <div>
            <input
              type='text'
              placeholder='Enter goal name'
              className='form-control form-control-sm'
              value={goalName}
              onChange={(event) => this.setState({ goalName: event.target.value })}
            />
            <div className={styles.goalType}>
              <label><input type='radio' checked={selectedType === 'savings'} value='savings' onChange={onChange} /> Savings</label>
              <span className={styles.spacer} />
              <label><input type='radio' checked={selectedType === 'debt'} value='debt' onChange={onChange} /> Debt Reduction</label>
            </div>
          </div>
        }
        <label style={{ marginTop: '10px' }}>
          <input type='checkbox' checked={updateSurvey} onChange={(event) => {
            this.setState({ updateSurvey: event.target.checked })
          }} />
          Update Survey
        </label>
        <hr />
      </div>
    )
  }

  renderDescription () {
    const { description } = this.state
    return (
      <div className='form-group'>
        <h6>Description</h6>
        <input
          type='text'
          placeholder='Enter goal description'
          className='form-control form-control-sm'
          value={description}
          onChange={(event) => this.setState({ description: event.target.value })}
        />
        <hr />
      </div>
    )
  }

  render () {
    const { years, selectedOption, customGoal, goalName, selectedType } = this.state
    const { goalModalOpen, dispatch } = this.props

    return (
      <div className='modal' tabIndex='-1' role='dialog' style={{ display: goalModalOpen ? 'block' : 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Create a Goal</h4>
              <button type='button' className='close' aria-label='Close' onClick={() => {
                dispatch(closeGoalModal())
                const newState = this.resetState(this.props, true)
                this.setState(newState)
              }}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {this.renderGoalName()}
              {this.renderDescription()}
              <div className={styles.goalYears}>
                <label htmlFor='placeholder'>
                  <h6>Goal Years</h6>
                  <table className={`table table-bordered ${styles.yearsTable}`}>
                    <thead>
                      <tr>
                        <th scope='col'>Year</th>
                        <th scope='col'>Amount</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {years.map(y => <tr key={y.year}>
                        <th scope='row'>{y.year}</th>
                        <td>
                          <input
                            type='number'
                            className='form-control form-control-sm'
                            value={y.value}
                            onChange={(event) => this.enterYearAmount(event, y)}
                          />
                        </td>
                        <td>
                          <button
                            className='btn btn-sm btn-link'
                            onClick={() => this.removeYear(y)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>)}
                    </tbody>
                  </table>
                </label>
              </div>
              <button
                type='button'
                className='btn btn-outline-secondary btn-sm'
                onClick={this.addYear}
              >
                Add Year
              </button>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sm btn-primary'
                onClick={this.saveGoal}
                disabled={(!customGoal && !selectedOption) ||
                  (customGoal && !goalName) ||
                  (customGoal && !selectedType) ||
                  !years ||
                  !years.filter(y => y.value).length}
              >
                Submit
              </button>
              <button type='button' className='btn btn-sm btn-secondary' onClick={() => {
                dispatch(closeGoalModal())
                const newState = this.resetState(this.props, true)
                this.setState(newState)
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

GoalModal.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {
    goalModalOpen: state.goals.goalModalOpen,
    goalToEdit: state.goals.goalToEdit,
    user: getUser(state)
  }
}

export default connect(mapStateToProps)(GoalModal)
