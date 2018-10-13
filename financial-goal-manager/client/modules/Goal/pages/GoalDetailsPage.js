import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Import Selectors
import { getGoal } from '../GoalsReducer'

class GoalDetailsPage extends Component {
  render () {
    const { name, type, description, years, progress } = this.props.goal

    return (
      <div>
        {name} <br />
        {type} <br />
        {description} <br />
        {years.length} <br />
        {progress.length}
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {
    goal: getGoal(state)
  }
}

GoalDetailsPage.propTypes = {
  goal: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    years: PropTypes.array.isRequired,
    progress: PropTypes.array,
    _id: PropTypes.string.isRequired
  })),
  dispatch: PropTypes.func.isRequired
}

GoalDetailsPage.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(GoalDetailsPage)
