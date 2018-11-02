import React, { Component } from 'react'

import NewGoal from './NewGoal'
import TutorAdvice from '../../Tutor/components/TutorAdvice'

class GoalCreatorButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goalModalOpen: false,
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
    const { goalModalOpen, tutorModalOpen } = this.state

    return (
      <div>
        <div className='row'>
          <div className='col'>
            <button
              className='btn btn-primary btn-sm'
              onClick={() => this.setModalStatus('goalModalOpen', true)}
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
        <NewGoal
          modalOpen={goalModalOpen}
          onSubmit={() => {}}
          onCancel={() => this.setModalStatus('goalModalOpen', false)}
        />
        <TutorAdvice
          adviceName={'moreWealth'}
          modalOpen={tutorModalOpen}
          onSubmit={() => {}}
          onCancel={() => this.setModalStatus('tutorModalOpen', false)}
        />
      </div>
    )
  }
}

export default GoalCreatorButton
