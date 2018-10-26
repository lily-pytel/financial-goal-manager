import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'

import { addGoalRequest } from '../GoalsActions'

class NewGoal extends Component {
  constructor (props) {
    super(props)

    const currentYear = new Date().getFullYear()
    this.state = {
      customGoal: false,
      selectedOption: null,
      selectedType: null,
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
    this.renderOptionsDropdown = this.renderOptionsDropdown.bind(this)
    this.renderRadio = this.renderRadio.bind(this)
    this.enterYearAmount = this.enterYearAmount.bind(this)
    this.addYear = this.addYear.bind(this)
    this.removeYear = this.removeYear.bind(this)
    this.saveGoal = this.saveGoal.bind(this)
  }

  saveGoal () {
    const { selectedOption, years } = this.state
    const { dispatch, onCancel } = this.props
    const goal = {
      name: selectedOption.label,
      type: selectedOption.value,
      description: '',
      years: years.filter(y => y.year && y.value)
    }

    dispatch(addGoalRequest(goal))
    onCancel()
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

  renderOptionsDropdown () {
    var options = [
      { value: 'emergency', label: 'Save for emergency' },
      { value: 'salary', label: 'Save part of salary' },
      { value: 'retirement', label: 'Save for retirement' },
      { value: 'debt', label: 'Pay off debt' }
    ]

    return (
      <div className='form-group'>
        <h5>Goal Name</h5>
        <Select
          style={{ width: '100%' }}
          value={this.state.selectedOption}
          onChange={(selectedOption) => {
            this.setState({ selectedOption })
          }}
          options={options}
        />
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
          <h5>Goal Type</h5>
          <input type='radio' checked={selectedType === 'savings'} value='savings' onChange={onChange} /> Savings<br />
          <input type='radio' checked={selectedType === 'debt'} value='debt' onChange={onChange} /> Debt Reduction<br />
        </label>
        <hr />
      </div>
    )
  }

  render () {
    const { years, selectedOption } = this.state
    const { modalOpen, onCancel } = this.props

    return (
      <div className='modal' tabIndex='-1' role='dialog' style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Create a Goal</h4>
              <button type='button' className='close' aria-label='Close' onClick={onCancel}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {this.renderOptionsDropdown()}
              {this.renderRadio()}
              <div className='form-group'>
                <label htmlFor='placeholder'>
                  <h5>Goal Years</h5>
                  <table className='table table-bordered'>
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
                            className='input-sm'
                            value={y.value}
                            onChange={(event) => this.enterYearAmount(event, y)}
                          />
                        </td>
                        <td>
                          <button
                            className='btn btn-sm btn-link'
                            style={{ padding: '0px' }}
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
                className='btn btn-primary'
                onClick={this.saveGoal}
                disabled={!selectedOption || !years || !years.length}
              >
                Submit
              </button>
              <button type='button' className='btn btn-secondary' onClick={onCancel}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NewGoal.propTypes = {
  modalOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(NewGoal)
