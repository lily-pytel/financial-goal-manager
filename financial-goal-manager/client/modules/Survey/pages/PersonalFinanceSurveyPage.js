import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import Selectors
import { getUser } from '../UsersReducer'
import { fetchUser, addUserRequest, dismissUpdateMessage } from '../UsersActions'

class PersonalFinanceSurveyPage extends Component {
  componentWillMount () {
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.renderRadioQuestion = this.renderRadioQuestion.bind(this)
    this.renderCheckboxQuestion = this.renderCheckboxQuestion.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchUser())
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState(nextProps.user)
    }
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
          ? existingValue.find(f => f[0] === value)
            ? existingValue.filter(f => f[0] !== value)
            : [...existingValue, value]
          : [value]
      })
    }
  }

  renderRadioQuestion (name, choices) {
    const { user } = this.props
    const currValue = this.state && this.state[name]

    choices.push({ value: 'abstain', label: 'Prefer not to answer' })

    const radios = choices.map(c => {
      const checked = currValue
        ? currValue === c.value
        : (user && user[name] === c.value) || false

      return (
        <div key={name + c.value}>
          <input type='radio' name={name} onChange={this.onChangeRadio} value={c.value} checked={checked} />
          &nbsp;&nbsp;{c.label}
        </div>
      )
    })

    return radios
  }

  renderCheckboxQuestion (name, choices) {
    const { user } = this.props

    choices.push({ value: 'abstain', label: 'Prefer not to answer' })

    const checkboxes = choices.map(c => {
      const checked = this.state && this.state[name]
        ? this.state[name].find(f => f[0] === c.value)
        : (user && user[name] && user[name].find(f => f[0] === c.value)) || false

      return (
        <div key={name + c.value}>
          <input type='checkbox' name={name} onChange={this.onChangeRadio} value={c.value} checked={checked} />
          &nbsp;&nbsp;{c.label}
        </div>
      )
    })

    return checkboxes
  }

  render () {
    const { dispatch, userSaved } = this.props
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
                {this.renderRadioQuestion('age', [
                  { value: '20', label: '20-30' }, { value: '31', label: '31-40' }, { value: '41', label: '41-50' }, { value: '51', label: '51+' }
                ])}
              </label>
            </div>
          </div>
        </div>

        <div style={titleStyle}>Savings and Debt</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you have emergency savings?</b><br />
                {this.renderRadioQuestion('emergencySavings', [
                  { value: 'tooMuch', label: 'Yes, more than 6 months of expenses' },
                  { value: 'full', label: 'Yes, 3-6 months of expenses' },
                  { value: 'partial', label: 'Yes, 1-2 months of expenses' },
                  { value: 'perliminary', label: 'Yes, less than 1 month of expenses' },
                  { value: 'none', label: 'No' }
                ])}
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you have debt? Check all that apply</b><br />
                {this.renderCheckboxQuestion('debt', [
                  { value: 'student', label: 'Student Loans' },
                  { value: 'car-expensive', label: 'Car Loan with interest rate higher than 3%' },
                  { value: 'car-cheap', label: 'Car Loan with interest rate lower than 3%' },
                  { value: 'house', label: 'Mortgage' },
                  { value: 'cc', label: 'Credit Card' },
                  { value: 'none', label: 'None' }
                ])}
              </label>
            </div>
          </div>
        </div>

        <div style={titleStyle}>Retirement</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>What kind of retirement does your employer offer?</b><br />
                {this.renderRadioQuestion('retirementJob', [
                  { value: 'pension', label: 'Pension' },
                  { value: '401k-match', label: 'Matched 401(k)' },
                  { value: '401k-no-match', label: 'Unmatched 401(k)' },
                  { value: 'none', label: 'None' }
                ])}
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you contribute to your retirement plan? If so, with how much?</b><br />
                {this.renderRadioQuestion('retirementContribution', [
                  { value: 'max', label: 'Maximum allowed by law ($18.5k a year for 401(k) and 5.5k for IRA)' },
                  { value: 'full', label: 'More than 20% of my salary' },
                  { value: 'partial', label: 'Between 10% and 20% of my salary' },
                  { value: 'perliminary', label: 'Under 10% of my salary' },
                  { value: 'none', label: 'I do not contribute' }
                ])}
              </label>
            </div>
          </div>
        </div>

        <div style={titleStyle}>Investments</div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you invest your retirement savings?</b><br />
                {this.renderRadioQuestion('retirementInvestment', [
                  { value: 'stocks', label: 'Yes, mostly stocks' },
                  { value: 'bonds', label: 'Yes, mostly bonds' },
                  { value: 'stocks-bonds', label: 'Yes, an equal mix of stocks and bonds' },
                  { value: 'cash', label: 'No, it is all in cash' },
                  { value: 'none', label: 'I have no retirement savings' }
                ])}
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label>
                <b>Do you invest outside of retirement?</b><br />
                {this.renderRadioQuestion('investment', [
                  { value: 'stocks', label: 'Yes, mostly stocks' },
                  { value: 'bonds', label: 'Yes, mostly bonds' },
                  { value: 'stocks-bonds', label: 'Yes, an equal mix of stocks and bonds' },
                  { value: 'cash', label: 'No, it is all in cash' },
                  { value: 'none', label: 'I have no savings outside of retirement' }
                ])}
              </label>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <button className='btn btn-primary' onClick={() => { dispatch(addUserRequest(this.state)) }}>Save</button>
          </div>
        </div>

        {userSaved && <div className='row' style={{ marginTop: '10px' }}>
          <div className='col'>
            <div className='alert alert-success alert-dismissible fade show' role='alert'>
              User saved successfully
              <button
                type='button'
                className='close'
                aria-label='Close'
                style={{ padding: '5px' }}
                onClick={() => dispatch(dismissUpdateMessage())}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {
    userSaved: state.users.userSaved,
    user: getUser(state)
  }
}

PersonalFinanceSurveyPage.propTypes = {
  user: PropTypes.shape({
    age: PropTypes.string,
    emergencySavings: PropTypes.string,
    debt: PropTypes.array,
    retirementJob: PropTypes.string,
    retirementContribution: PropTypes.string,
    retirementInvestment: PropTypes.string,
    investment: PropTypes.string,
    _id: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

PersonalFinanceSurveyPage.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(PersonalFinanceSurveyPage)
