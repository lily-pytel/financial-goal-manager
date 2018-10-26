import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function TutorAdvice (props) {
  const { modalOpen } = props
  return (
    <div className='modal' tabIndex='-1' role='dialog' style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Emergency Savings</h5>
            <button type='button' className='close' aria-label='Close' onClick={props.onCancel}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div>Our information indicates that you have not yet set aside some savings for <b>emergency expenses</b>,
            such as loss of employment, car trouble or medical emergencies.</div>
            <br />
            <div>
              We recommend setting aside <b>3-6 months of expenses</b> as a <b>'rainy day'</b> fund in a low-risk location.
              Remember that risky investments often require a long time in the market, and this is money you might need tomorrow.
              Start by saving any amount you can - any contribution matters!
            </div>
            <br />
            <h5>Useful Links</h5>
            <div>
              <a href='https://www.wellsfargo.com/financial-education/basic-finances/manage-money/cashflow-savings/emergencies/'>Saving for an Emergency</a><br />
              <a href='https://learnvest.com/article/how-much-should-i-save-in-an-emergency-fund'>How Much Should I Save in an Emergency Fund?</a>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={props.onCancel}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

TutorAdvice.propTypes = {
  modalOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(TutorAdvice)
