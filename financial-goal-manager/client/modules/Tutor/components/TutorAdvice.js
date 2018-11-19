import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import advice from '../data/Advice'

import { getUser } from '../../Survey/UsersReducer'
import { fetchUser } from '../../Survey/UsersActions'

class TutorAdvice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currAdvice: null,
      adviceIndex: null
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchUser())

    this.getNextAdvice = this.getNextAdvice.bind(this)
    this.determineAdviceForUser = this.determineAdviceForUser.bind(this)

    const { currAdvice, adviceIndex } = this.determineAdviceForUser(this.props.user)

    this.setState({
      currAdvice,
      adviceIndex
    })
  }

  componentWillReceiveProps (nextProps) {
    const { user } = this.props

    if (user !== nextProps.user) {
      const { currAdvice, adviceIndex } = this.determineAdviceForUser(nextProps.user)

      this.setState({
        currAdvice,
        adviceIndex
      })
    }
  }

  determineAdviceForUser (user) {
    if (!user) {
      return { currAdvice: advice[2], adviceIndex: 2 }
    }

    const emergencySavings = user.emergencySavings
    const debt = user.debt && user.debt.map(d => d[0])
    const retirementContribution = user.retirementContribution
    const retirementJob = user.retirementJob

    // First priority: emergency savings
    if (!emergencySavings || emergencySavings === 'none') {
      return { currAdvice: advice[0], adviceIndex: 0 }
    }

    // Second priority: full emergency savings
    if (emergencySavings === 'partial' || emergencySavings === 'perliminary') {
      return { currAdvice: advice[1], adviceIndex: 1 }
    }

    // Third priority: eliminating high interest debt
    const badDebt = ['car-expensive', 'loan-expensive', 'other-expensive', 'cc']
    const highInterestDebt = debt &&
      debt.some(r => badDebt.indexOf(r) >= 0)
    if (highInterestDebt) {
      return { currAdvice: advice[3], adviceIndex: 3 }
    }

    // Fourth priority: retirement whatsowhat
    const jobOffered = retirementJob && retirementJob !== 'none'
    const pensionOffered = retirementJob === 'pension'
    const doesNotContribute = !retirementContribution ||
      retirementContribution === 'none'
    if (!jobOffered && doesNotContribute) {
      return { currAdvice: advice[7], adviceIndex: 7 }
    }

    // Fifth priority: retirement at work
    if (jobOffered && doesNotContribute && !pensionOffered) {
      return { currAdvice: advice[6], adviceIndex: 6 }
    }

    // Sixth priority: unmatched retirement
    if (!jobOffered && doesNotContribute && !pensionOffered) {
      return { currAdvice: advice[5], adviceIndex: 5 }
    }

    // Other: if they have low priority debt and are not risk averse
    if (debt && debt.length && !highInterestDebt) {
      return { currAdvice: advice[4], adviceIndex: 4 }
    }

    // Other: if they have too much cash or they have no other issues
    return { currAdvice: advice[2], adviceIndex: 2 }
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

    if (currAdvice === null) return null

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
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {
    user: getUser(state)
  }
}

export default connect(mapStateToProps)(TutorAdvice)
