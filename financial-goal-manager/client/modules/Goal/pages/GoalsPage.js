import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import Components
import Goals from '../components/Goals'
import NewGoal from '../components/NewGoal'
//import TutorAdvice from '../../Tutor/components/TutorAdvice'

// Import Selectors
import { fetchGoals } from '../GoalsActions'
import { getGoals } from '../GoalsReducer'

class GoalsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goalModalOpen: true,
      tutorModalOpen: false
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchGoals())
  }

  render () {
    const { goalModalOpen, tutorModalOpen } = this.state
    const { goals } = this.props

    if (!goals) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <Goals goals={this.props.goals} />
        <div className='row'>
          <div className='col'>
            <button
              className='btn btn-primary btn-sm'
              onClick={(click) => {
                this.setState({ goalModalOpen: !goalModalOpen })
              }}
            >
              Create a goal
            </button>
            <br />
            <button
              className='btn btn-link'
              onClick={(click) => {
                this.setState({ tutorModalOpen: !tutorModalOpen })
              }}
            >
              Help me choose a goal
            </button>
          </div>
        </div>
        <NewGoal
          modalOpen={goalModalOpen}
          onSubmit={() => {}}
          onCancel={() => {
            this.setState({ goalModalOpen: false })
          }}
        />
      </div>
    )
  }
}

// Actions required to provide data for this component to render in sever side.
GoalsPage.need = [() => { return fetchGoals() }]

// Retrieve data from store as props
function mapStateToProps (state) {
  return {
    goals: getGoals(state)
  }
}

GoalsPage.propTypes = {
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

GoalsPage.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(GoalsPage)
