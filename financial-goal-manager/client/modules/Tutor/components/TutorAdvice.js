import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import advice from '../data/Advice'

class TutorAdvice extends Component {
  constructor (props) {
    super(props)

    const { adviceName } = props
    let currAdvice = null
    let adviceIndex = null

    advice.forEach((a, index) => {
      if (a.key === adviceName) {
        currAdvice = a
        adviceIndex = index
      }
    })

    this.state = {
      currAdvice,
      adviceIndex
    }
  }

  componentDidMount () {
    const { adviceName } = this.props
    let currAdvice = null
    let adviceIndex = null

    this.getNextAdvice = this.getNextAdvice.bind(this)

    advice.forEach((a, index) => {
      if (a.key === adviceName) {
        currAdvice = a
        adviceIndex = index
      }
    })

    this.setState({
      currAdvice,
      adviceIndex
    })
  }

  getNextAdvice () {
    const { adviceIndex } = this.state
    const nextIndex = adviceIndex >= advice.length - 1 ? 0 : adviceIndex + 1
    const nextAdvice = advice[nextIndex]

    this.setState({
      currAdvice: nextAdvice,
      adviceIndex: nextIndex
    })
  }

  render () {
    const { modalOpen, onCancel } = this.props
    const { currAdvice } = this.state

    return (
      <div className='modal' tabIndex='-1' role='dialog' style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className='modal-dialog' role='document' style={{ maxWidth: '800px' }}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{currAdvice.title}</h5>
              <button type='button' className='close' aria-label='Close' onClick={onCancel}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='advice-body' style={{ maxHeight: '300px', overflow: 'auto', marginBottom: '15px' }}>
                {currAdvice.paragraphs}
                {!currAdvice.lastAdvice &&
                  <p>If you believe you shuold not get this advice, please <Link to='/survey'>update</Link> your information</p>
                }
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
              <button className='btn btn-light' onClick={this.getNextAdvice}>Next Advice</button>
              <button type='button' className='btn btn-secondary' onClick={onCancel}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
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
