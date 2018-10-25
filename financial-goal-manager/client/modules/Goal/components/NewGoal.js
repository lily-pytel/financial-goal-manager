import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class NewGoal extends Component {
  renderOptionsDropdown () {
    return (
      <div className='dropdown-menu dropdown-menu-right'>
        <button className='dropdown-item' type='button'>Save for emergency</button>
        <button className='dropdown-item' type='button'>Save part of salary</button>
        <button className='dropdown-item' type='button'>Create my own goal</button>
      </div>
    )
  }

  render () {
    const { modalOpen } = this.props

    return (
      <div className='modal' tabIndex='-1' role='dialog' style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Create a Goal</h5>
              <button type='button' className='close' aria-label='Close' onClick={this.props.onCancel}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <div className='btn-group'>
                  <label>
                    <h6>Goal Name</h6>
                    <button type='button' className='btn btn btn-outline-secondary dropdown-toggle btn-sm' data-toggle='dropdown'>
                      Select Goal Name
                    </button>
                    {this.renderOptionsDropdown()}
                  </label>
                </div>
              </div>
              <hr />
              <div className='form-group'>
                <label htmlFor='placeholder'>
                  <h6>Goal Type</h6>
                  <input type='radio' name='gender' value='male' /> Savings<br />
                  <input type='radio' name='gender' value='female' /> Debt Reduction<br />
                </label>
              </div>
              <hr />
              <div className='form-group'>
                <label htmlFor='placeholder'>
                  <h6>Goal Years</h6>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th scope='col'>Year</th>
                        <th scope='col'>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope='row'>2018</th>
                        <td><input type='text' name='' className='input-sm' /></td>
                      </tr>
                      <tr>
                        <th scope='row'>2019</th>
                        <td><input type='text' name='' className='input-sm' /></td>
                      </tr>
                      <tr>
                        <th scope='row'>2020</th>
                        <td><input type='text' name='' className='input-sm' /></td>
                      </tr>
                    </tbody>
                  </table>
                </label>
              </div>
              <div className='form-group'><button type='' className='btn btn-outline-secondary btn-sm'>Add Year</button></div>
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
