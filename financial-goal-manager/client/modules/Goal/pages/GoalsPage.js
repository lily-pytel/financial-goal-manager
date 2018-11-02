import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import Components
import Goals from '../components/Goals'
import NewGoal from '../components/NewGoal'
import GoalCreatorButton from '../components/GoalCreatorButton'

// Import Selectors
import { fetchGoals } from '../GoalsActions'
import { getGoals } from '../GoalsReducer'

class GoalsPage extends Component {
  componentDidMount () {
    this.props.dispatch(fetchGoals())
  }

  render () {
    const { goals } = this.props

    if (!goals) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <Goals goals={this.props.goals} />
        <GoalCreatorButton />
        <NewGoal />
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
