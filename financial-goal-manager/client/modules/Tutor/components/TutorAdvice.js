import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import advice from '../data/Advice'

function TutorAdvice (props) {
  const { modalOpen, adviceName } = props
  const currAdvice = advice[adviceName]

  return (
    <div className='modal' tabIndex='-1' role='dialog' style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className='modal-dialog' role='document' style={{ maxWidth: '600px' }}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{currAdvice.title}</h5>
            <button type='button' className='close' aria-label='Close' onClick={props.onCancel}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='advice-body' style={{ maxHeight: '450px', overflow: 'auto', marginBottom: '15px' }}>
              {currAdvice.paragraphs}
              <p>If you believe you shuold not get this advice, please <Link to='/survey'>update</Link> your information</p>
              <br />
            </div>
            <div className='userful-links' style={{ borderTop: '1px solid #e9ecef', paddingTop: '15px' }}>
              <h5>Useful Links</h5>
              <ul>
                {currAdvice.usefulLinks.map(link => <li key={link.label}><a href={link.link}>{link.label}</a></li>)}
              </ul>
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
  dispatch: PropTypes.func.isRequired,
  adviceName: PropTypes.string
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(TutorAdvice)
