import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import styles from './GoalModal.css'

import { getUser } from '../../Survey/UsersReducer'
import { addUserRequest } from '../../Survey/UsersActions'
import { addGoalRequest, closeGoalModal } from '../GoalsActions'

const dropdownOptions = [
  {
    value: 'emergency',
    label: 'Save for emergency',
    userSurveyArea: 'emergencySavings',
    userSurveyValue: 'partial'
  }, {
    value: 'salary',
    label: 'Save part of salary',
    userSurveyArea: 'investment',
    userSurveyValue: 'cash'
  }, {
    value: 'bonus',
    label: 'Save part of bonus',
    userSurveyArea: 'investment',
    userSurveyValue: 'cash'
  }, {
    value: 'retirement-401k',
    label: 'Retirement: Contribute to 401(k)',
    userSurveyArea: 'retirementContribution',
    userSurveyValue: 'perliminary'
  }, {
    value: 'retirement-IRA',
    label: 'Retirement: Contribute to IRA',
    userSurveyArea: 'retirementContribution',
    userSurveyValue: 'perliminary'
  }, {
    value: 'cc',
    label: 'Debt: Pay Off Credit Card',
    userSurveyArea: 'debt'
  }, {
    value: 'car-expensive',
    label: 'Debt: Pay Off Car (High Interest Loan)',
    userSurveyArea: 'debt'
  }, {
    value: 'car-cheap',
    label: 'Debt: Pay Off Car (Low Interest Loan)',
    userSurveyArea: 'debt'
  }, {
    value: 'house',
    label: 'Debt: Pay Off Mortgage',
    userSurveyArea: 'debt'
  }, {
    value: 'student',
    label: 'Debt: Pay Off Student Loans',
    userSurveyArea: 'debt'
  }, {
    value: 'loan',
    label: 'Debt: Pay Off Loan',
    userSurveyArea: 'debt'
  }, {
    value: 'other',
    label: 'Other',
    userSurveyArea: 'debt' }
]

class GoalModal extends Component {
  constructor (props) {
    super(props)
    this.state = this.resetState(props)
  }

  componentWillMount () {
    this.renderGoalName = this.renderGoalName.bind(this)
    this.renderRadio = this.renderRadio.bind(this)
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
    const { selectedOption, years, description, updateSurvey } = this.state
    const { dispatch, goalToEdit, user } = this.props
    const goal = {
      _id: goalToEdit && goalToEdit._id,
      name: selectedOption.label,
      type: selectedOption.value,
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
    const { updateSurvey } = this.state
    return (
      <div className='form-group'>
        <h6>Goal Name</h6>
        <Select
          placeholder='Type to search'
          style={{ width: '100%' }}
          value={this.state.selectedOption}
          onChange={(selectedOption) => {
            this.setState({ selectedOption })
          }}
          options={dropdownOptions}
        />
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

  renderRadio () {
    const { customGoal, selectedType } = this.state

    if (!customGoal) {
      return null
    }

    const onChange = (event) => {
      const value = event.target.value
      this.setState({ selectedType: value })
    }

    return (
      <div className='form-group'>
        <label htmlFor='placeholder'>
          <h6>Goal Type</h6>
          <input type='radio' checked={selectedType === 'savings'} value='savings' onChange={onChange} /> Savings<br />
          <input type='radio' checked={selectedType === 'debt'} value='debt' onChange={onChange} /> Debt Reduction<br />
        </label>
        <hr />
      </div>
    )
  }

  render () {
    const { years, selectedOption, description } = this.state
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
              <div className='form-group'>
                <h6>Description</h6>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={description}
                  onChange={(event) => this.setState({ description: event.target.value })}
                />
                <hr />
              </div>
              {this.renderRadio()}
              <div className={`form-group ${styles.goalYears}`}>
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
              <div className='form-group'>
                <button
                  type='button'
                  className='btn btn-outline-secondary btn-sm'
                  onClick={this.addYear}
                >
                  Add Year
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sm btn-primary'
                onClick={this.saveGoal}
                disabled={!selectedOption || !years || !years.filter(y => y.value).length}
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
