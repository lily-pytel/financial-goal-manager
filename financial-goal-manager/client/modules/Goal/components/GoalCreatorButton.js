import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { openGoalModal } from '../GoalsActions'
import TutorAdvice from '../../Tutor/components/TutorAdvice'

class GoalCreatorButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tutorModalOpen: false
    }
  }

  componentWillMount () {
    this.setModalStatus = this.setModalStatus.bind(this)
  }

  setModalStatus (modalName, modalStatus) {
    this.setState({ [modalName]: modalStatus })
  }

  render () {
    const { dispatch } = this.props
    const { tutorModalOpen } = this.state

    return (
      <div>
        <div className='row'>
          <div className='col'>
            <button
              className='btn btn-primary btn-sm'
              onClick={() => dispatch(openGoalModal())}
            >
              Create a goal
            </button>
            <br />
            <button
              style={{ paddingLeft: '0' }}
              className='btn btn-link'
              onClick={() => this.setModalStatus('tutorModalOpen', true)}
            >
              Help me choose a goal
            </button>
          </div>
        </div>
        <TutorAdvice
          modalOpen={tutorModalOpen}
          onSubmit={() => {}}
          onCancel={() => this.setModalStatus('tutorModalOpen', false)}
        />
      </div>
    )
  }
}

GoalCreatorButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(GoalCreatorButton)
