import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import styles from './GoalModal.css'

import { addGoalRequest, closeGoalModal } from '../GoalsActions'

const dropdownOptions = [
  { value: 'emergency', label: 'Save for emergency' },
  { value: 'salary', label: 'Save part of salary' },
  { value: 'salary', label: 'Save part of bonus' },
  { value: 'retirement-401k', label: 'Retirement: Contribute to 401(k)' },
  { value: 'retirement-IRA', label: 'Retirement: Contribute to IRA' },
  { value: 'cc', label: 'Debt: Pay Off Credit Card' },
  { value: 'car-expensive', label: 'Debt: Pay Off Car (High Interest Loan)' },
  { value: 'car-cheap', label: 'Debt: Pay Off Car (Low Interest Loan)' },
  { value: 'house', label: 'Debt: Pay Off Mortgage' },
  { value: 'student', label: 'Debt: Pay Off Student Loans' },
  { value: 'loan', label: 'Debt: Pay Off Loan' },
  { value: 'other', label: 'Other' }
]

class GoalModal extends Component {
  constructor (props) {
    super(props)

    const { goalToEdit } = this.props
    const currentYear = new Date().getFullYear()
    const selectedOption = goalToEdit && dropdownOptions.find(o => o.label === goalToEdit.name)

    this.state = {
      customGoal: false,
      selectedOption: selectedOption,
      selectedType: null,
      description: goalToEdit && goalToEdit.description,
      updateSurvey: true,
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

  componentWillMount () {
    this.renderGoalName = this.renderGoalName.bind(this)
    this.renderRadio = this.renderRadio.bind(this)
    this.enterYearAmount = this.enterYearAmount.bind(this)
    this.addYear = this.addYear.bind(this)
    this.removeYear = this.removeYear.bind(this)
    this.saveGoal = this.saveGoal.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { goalToEdit } = this.props

    if (goalToEdit && goalToEdit !== prevProps.goalToEdit) {
      this.loadExistingGoal()
    }
  }

  loadExistingGoal () {
    const { goalToEdit } = this.props
    const selectedOption = goalToEdit && dropdownOptions.find(o => o.label === goalToEdit.name)
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
    const { selectedOption, years, description } = this.state
    const { dispatch, goalToEdit } = this.props
    const goal = {
      _id: goalToEdit && goalToEdit._id,
      name: selectedOption.label,
      type: selectedOption.value,
      description,
      years: years
        .filter(y => y.year && y.value)
        .map(y => ({ year: y.year, value: parseInt(y.value, 10) }))
    }

    dispatch(addGoalRequest(goal))
    dispatch(closeGoalModal())
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
              <button type='button' className='close' aria-label='Close' onClick={() => dispatch(closeGoalModal())}>
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
                disabled={!selectedOption || !years || !years.length}
              >
                Submit
              </button>
              <button type='button' className='btn btn-sm btn-secondary' onClick={() => dispatch(closeGoalModal())}>Close</button>
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
    goalToEdit: state.goals.goalToEdit
  }
}

export default connect(mapStateToProps)(GoalModal)
