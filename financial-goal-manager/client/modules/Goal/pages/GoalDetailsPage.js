import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import './GoalDetailsPage.css'

// Import Selectors
import { getGoal } from '../GoalsReducer'
import { fetchGoals } from '../GoalsActions'

class GoalDetailsPage extends Component {
  componentDidMount () {
    this.props.dispatch(fetchGoals())
    this.renderProgressRow = this.renderProgressRow.bind(this)
  }

  renderProgressRow (row) {
    const { goal } = this.props
    const date = moment(row.date)
    const progressYear = date.year()

    const goalYear = goal.years
      .map(goalEntry => goalEntry[0])
      .find(goalEntry => {
        return goalEntry.year === progressYear
      })

    const goalAmount = goalYear ? goalYear.value : ''

    return (
      <tr>
        <td>{date.format('L')}</td>
        <td>{row.value}</td>
        <td>{progressYear}</td>
        <td>{goalAmount}</td>
      </tr>
    )
  }

  render () {
    const { goal } = this.props

    if (!goal) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <div className='jumbotron jumbotron-fluid jumbotron-sm' style={{ padding: '1em' }}>
          <div className='container'>
            <h1 className='display-4'>{goal.name}</h1>
            <p className='lead'>{goal.description}</p>
            <hr />
            <p>{goal.type}</p>
          </div>
        </div>

        <table className='table table-striped'>
          <thead>
            <th>Entry Date</th>
            <th>Entry Value</th>
            <th>Goal Year</th>
            <th>Goal Year</th>
          </thead>
          <tbody>
            {goal.progress.map(row => this.renderProgressRow(row[0]))}
          </tbody>
        </table>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps (state, existingProps) {
  return {
    goal: getGoal(state, existingProps.params.id)
  }
}

GoalDetailsPage.propTypes = {
  goal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    years: PropTypes.array.isRequired,
    progress: PropTypes.array,
    _id: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

GoalDetailsPage.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(GoalDetailsPage)
