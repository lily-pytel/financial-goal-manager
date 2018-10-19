import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PersonalFinanceSurveyPage extends Component {
  componentWillMount () {
    this.onChangeRadio = this.onChangeRadio.bind(this)
  }

  onChangeRadio (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    const existingValue = this.state && this.state[name]

    if (target.type !== 'checkbox') {
      this.setState({ [name]: value })
    } else {
      this.setState({
        [name]: existingValue
          ? existingValue.find(f => f === value)
            ? existingValue.filter(f => f !== value)
            : [...existingValue, value]
          : [value]
      })
    }
  }

  render () {
    const titleStyle = {
      backgroundColor: '#e9ecef',
      padding: '8px 5px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '18px'
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='jumbotron jumbotron-fluid jumbotron-sm' style={{ padding: '1em' }}>
              <div className='container'>
                <h1 className='display-4'>Financial Health Assessment</h1>
                <p className='lead'>How are your current finances?</p>
                <hr />
                <p>Please answer a few short questions regarding your current finances. The answers are completely
                confidential because this survey is running locally. This will help our smart goal planner</p>
              </div>
            </div>
          </div>
        </div>
        <div style={titleStyle}>Personal Information</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>What is your age?</b><br />
                <input type='radio' name='age' onChange={this.onChangeRadio} value='20' /> 20-30<br />
                <input type='radio' name='age' onChange={this.onChangeRadio} value='31' /> 31-40<br />
                <input type='radio' name='age' onChange={this.onChangeRadio} value='41' /> 41-50<br />
                <input type='radio' name='age' onChange={this.onChangeRadio} value='51' /> 51+<br />
                <input type='radio' name='age' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col' />
          <div className='col' />
        </div>

        <div style={titleStyle}>Savings and Debt</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you have emergency savings?</b><br />
                <input type='radio' name='emergencySavings' onChange={this.onChangeRadio} value='full' /> Yes, 3-6 months of expenses<br />
                <input type='radio' name='emergencySavings' onChange={this.onChangeRadio} value='partial' /> Yes, 1-2 months of expenses<br />
                <input type='radio' name='emergencySavings' onChange={this.onChangeRadio} value='perliminary' /> Yes, less than 1 month of expensesk<br />
                <input type='radio' name='emergencySavings' onChange={this.onChangeRadio} value='none' /> No<br />
                <input type='radio' name='emergencySavings' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you have debt? Check all that apply</b><br />
                <input type='checkbox' name='debt' onChange={this.onChangeRadio} value='student' /> Student Loans<br />
                <input type='checkbox' name='debt' onChange={this.onChangeRadio} value='car' /> Car Loan<br />
                <input type='checkbox' name='debt' onChange={this.onChangeRadio} value='house' /> Mortgage<br />
                <input type='checkbox' name='debt' onChange={this.onChangeRadio} value='cc' /> Credit Card<br />
                <input type='checkbox' name='debt' onChange={this.onChangeRadio} value='none' /> None<br />
                <input type='checkbox' name='debt' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col' />
        </div>

        <div style={titleStyle}>Retirement</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>What kind of retirement does your employer offer?</b><br />
                <input type='radio' name='retirementJob' onChange={this.onChangeRadio} value='pension' /> Pension<br />
                <input type='radio' name='retirementJob' onChange={this.onChangeRadio} value='401k-match' /> Matched 401k<br />
                <input type='radio' name='retirementJob' onChange={this.onChangeRadio} value='401k-no-match' /> Unmatched 401k<br />
                <input type='radio' name='retirementJob' onChange={this.onChangeRadio} value='none' /> None<br />
                <input type='radio' name='retirementJob' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you contribute to your retirement plan? If so, with how much?</b><br />
                <input type='radio' name='retirementContribution' onChange={this.onChangeRadio} value='max' /> Maximum allowed by law ($18.5k a year for 401k and 5.5k for IRA)<br />
                <input type='radio' name='retirementContribution' onChange={this.onChangeRadio} value='full' /> More than 20% of my salary<br />
                <input type='radio' name='retirementContribution' onChange={this.onChangeRadio} value='partial' /> Between 10% and 20% of my salary<br />
                <input type='radio' name='retirementContribution' onChange={this.onChangeRadio} value='perliminary' /> Under 10% of my salary<br />
                <input type='radio' name='retirementContribution' onChange={this.onChangeRadio} value='none' /> I do not contribute<br />
                <input type='radio' name='retirementContribution' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col' />
        </div>

        <div style={titleStyle}>Investments</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you invest your retirement savings?</b><br />
                <input type='radio' name='retirementInvestment' onChange={this.onChangeRadio} value='stocks' /> Yes, mostly stocks<br />
                <input type='radio' name='retirementInvestment' onChange={this.onChangeRadio} value='bonds' /> Yes, mostly bonds<br />
                <input type='radio' name='retirementInvestment' onChange={this.onChangeRadio} value='stocks-bonds' /> Yes, an equals mix of stocks and bonds<br />
                <input type='radio' name='retirementInvestment' onChange={this.onChangeRadio} value='cash' /> No, it is all in cash<br />
                <input type='radio' name='retirementInvestment' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you invest outside of retirement?</b><br />
                <input type='radio' name='investment' onChange={this.onChangeRadio} value='stocks' /> Yes, mostly stocks<br />
                <input type='radio' name='investment' onChange={this.onChangeRadio} value='bonds' /> Yes, mostly bonds<br />
                <input type='radio' name='investment' onChange={this.onChangeRadio} value='stock-bonds' /> Yes, an equals mix of stocks and bonds<br />
                <input type='radio' name='investment' onChange={this.onChangeRadio} value='cash' /> No, all my savings are in cash<br />
                <input type='radio' name='investment' onChange={this.onChangeRadio} value='abstain' /> Prefer not to answer
              </label>
            </div>
          </div>
          <div className='col' />
        </div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {
  }
}

PersonalFinanceSurveyPage.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    years: PropTypes.array.isRequired,
    progress: PropTypes.array,
    _id: PropTypes.string.isRequired
  })),
  dispatch: PropTypes.func.isRequired
}

PersonalFinanceSurveyPage.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(PersonalFinanceSurveyPage)
