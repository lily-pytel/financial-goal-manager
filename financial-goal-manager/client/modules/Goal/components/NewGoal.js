import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select';

class NewGoal extends Component {
  constructor (props) {
    super(props)

    const currentYear = new Date().getFullYear()
    this.state = {
      selectedOption: null,
      selectedType: null,
      years: [{
        id: currentYear,
        value: ''
      }, {
        id: currentYear + 1,
        value: ''
      }, {
        id: currentYear + 2,
        value: ''
      }
    ]}
  }

  componentWillMount() {
    this.renderOptionsDropdown = this.renderOptionsDropdown.bind(this)
    this.renderRadio = this.renderRadio.bind(this)
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
      </div>
    )
  }

  renderRadio () {
    const { selectedType } = this.state
    const onChange = (event) => {
      const value = event.target.value
      this.setState({ selectedType: value })
    }

    return (
      <div className='form-group'>
        <label htmlFor='placeholder'>
          <h5>Goal Type</h5>
          <input type='radio' checked={selectedType === 'savings'} value='savings' onChange={onChange}/> Savings<br />
          <input type='radio' checked={selectedType === 'debt'} value='debt' onChange={onChange}/> Debt Reduction<br />
        </label>
      </div>
    )
  }

  render () {
    const { years } = this.state
    const { modalOpen } = this.props

    return (
      <div className='modal' tabIndex='-1' role='dialog' style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Create a Goal</h4>
              <button type='button' className='close' aria-label='Close' onClick={this.props.onCancel}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {this.renderOptionsDropdown()}
              <hr />
              {this.renderRadio()}
              <hr />
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
                      {years.map(y => <tr key={y.id}>
                        <th scope='row'>{y.id}</th>
                        <td>
                          <input
                            type='text'
                            className='input-sm'
                            value={y.value}
                            onChange={(event) => {
                              const value = event.target.value
                              const newYears = [...years]
                              const currYear = newYears.find(ny => ny.id === y.id)

                              if (currYear) {
                                currYear.value = value
                                this.setState({ years: newYears })
                              }
                            }}
                          />
                        </td>
                        <td>
                          <button
                            className='btn btn-sm btn-link'
                            style={{ padding: '0px' }}
                            onClick={() => {
                              const newYears = years.filter(ny => ny.id !== y.id)
                              this.setState({ years: newYears })
                            }}
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
                  onClick={() => {
                    const lastYear = years && years.length
                      ? years[years.length - 1].id
                      : new Date().getFullYear()
                    const newYears = [...years]
                    newYears.push({
                      id: lastYear + 1,
                      amount: ''
                    })

                    this.setState({ years: newYears })
                  }}
                >
                  Add Year
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={this.props.onSubmit}>Submit</button>
              <button type='button' className='btn btn-secondary' onClick={this.props.onCancel}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NewGoal.propTypes = {
  modalOpen: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(NewGoal)
