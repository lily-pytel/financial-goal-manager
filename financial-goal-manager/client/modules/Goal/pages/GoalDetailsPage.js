import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactHighcharts from 'react-highcharts'
import { FaTrashAlt } from 'react-icons/fa'
import './GoalDetailsPage.css'
import { debt } from '../../../util/constants'

// Import Selectors
import { getGoal } from '../GoalsReducer'
import { fetchGoals, deleteProgressRequest, addProgressRequest } from '../GoalsActions'

const config = {
  title: {
    text: 'Goal Progress'
  },
  chart: {
    zoomType: 'xy'
  },
  xAxis: {
    type: 'datetime',
    minTickInterval: 90 * 24 * 3600 * 1000,
    title: {
      text: 'Year'
    },
    labels: {
      formatter: function () {
        const date = new Date(this.value)
        return `${date.toLocaleDateString('en-us', { month: 'long', year: 'numeric' })}`
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Amount'
    }
  }
}

class GoalDetailsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pendingProgress: {
        date: '',
        value: ''
      }
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchGoals())
    this.renderProgressRow = this.renderProgressRow.bind(this)
    this.updateChartOptions = this.updateChartOptions.bind(this)
    this.deleteProgress = this.deleteProgress.bind(this)
    this.addProgress = this.addProgress.bind(this)
    this.getCompletionRate = this.getCompletionRate.bind(this)
  }

  deleteProgress (row) {
    const { dispatch, goal } = this.props

    dispatch(deleteProgressRequest(goal._id, row))
  }

  addProgress () {
    const { dispatch, goal } = this.props
    const { pendingProgress } = this.state

    dispatch(addProgressRequest(goal._id, pendingProgress))
  }

  updateChartOptions () {
    const { goal } = this.props
    const years = goal.years
    const firstYear = years && years.length && years[0]
    const lastYear = years && years.length && years[years.length - 1]

    const goalSeries = []
    years
      .map(y => y[0])
      .forEach(y => {
        goalSeries.push([
          Date.UTC(y.year, 0, 1),
          y.value
        ])
        goalSeries.push([
          Date.UTC(y.year, 11, 31),
          y.value
        ])
      })

    const progressSeries = goal.progress
      .map(progress => progress[0])
      .filter(progress => progress)
      .map(progress => {
        const d = new Date(progress.date)

        return [
          Date.UTC(d.getFullYear(), d.getMonth(), d.getDay()),
          progress.value
        ]
      })
      .sort((a, b) => a[0] - b[0])

    config.subtitle = firstYear && firstYear.length && lastYear && lastYear.length
      ? { text: `from ${firstYear[0].year} to ${lastYear[0].year}` }
      : 'Progress Report'

    config.xAxis = { ...config.xAxis, categories: years }
    config.series = [
      {
        name: 'Goal',
        color: '#419CA7',
        pointStart: Date.UTC(firstYear, 0, 1),
        data: goalSeries
      }, {
        name: 'Progress',
        color: '#8BA251',
        pointStart: Date.UTC(firstYear, 0, 1),
        data: progressSeries
      }]
  }

  getCompletionRate (sortedProgress) {
    const { goal } = this.props
    const years = goal.years.map(goalEntry => goalEntry[0])
    const lastYear = years && years.length && years[years.length - 1]
    const lastYearAmount = lastYear && lastYear.value ? lastYear.value : 0
    const lastProgress = sortedProgress && sortedProgress.length && sortedProgress[0]
    const lastProgressAmount = lastProgress && lastProgress.value ? lastProgress.value : 0

    let completionRateRound = 0
    if (debt.includes(goal.type)) {
      const completionRate = lastProgressAmount ? (lastYearAmount / lastProgressAmount) * 100 : 0
      completionRateRound = Math.round(completionRate, 10)
    } else {
      const completionRate = lastYearAmount ? (lastProgressAmount / lastYearAmount) * 100 : 0
      completionRateRound = Math.round(completionRate, 10)
    }

    return completionRateRound
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

    const goalAmount = goalYear
      ? goalYear.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : ''
    const formattedValue = row.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return (
      <tr key={row.date}>
        <td>{date.format('L')}</td>
        <td>{formattedValue}</td>
        <td>{progressYear}</td>
        <td>{goalAmount}</td>
        <td>
          <button
            className='btn btn-link'
            style={{ padding: '0' }}
            onClick={() => this.deleteProgress(row)}
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    )
  }

  render () {
    const { goal, progressAdded, progressDeleted } = this.props
    const { pendingProgress } = this.state

    if (!goal) {
      return (
        <div>Loading...</div>
      )
    }

    this.updateChartOptions()
    const aggregationType = debt.includes(goal.type) ? 'Debt' : 'Savings'
    const sortedProgress = goal.progress
      .filter(row => row && row[0])
      .map(row => row[0])
      .sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
      })
    const completionRateRound = this.getCompletionRate(sortedProgress)
    const goalComplete = completionRateRound >= 100

    return (
      <div>
        <div className='jumbotron jumbotron-fluid jumbotron-sm' style={{ padding: '1em' }}>
          <h1 className='display-4'>{goal.name}</h1>
          <p className='lead'>{goal.description}</p>
          <p>{completionRateRound}% Complete</p>
          <hr />
          <p>
            <span className='badge badge-secondary'>{aggregationType}</span>&nbsp;
            {goalComplete
              ? <span className='badge badge-success'>Complete</span>
              : <span className='badge badge-warning'>In Progress</span>
            }
          </p>
        </div>

        <ReactHighcharts config={config} isPureConfig />

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Entry Date</th>
              <th>Entry Value</th>
              <th>Goal Year</th>
              <th>Goal Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sortedProgress.map(row => this.renderProgressRow(row))}
          </tbody>
        </table>
        {progressDeleted && <div className='alert alert-success' role='alert'>
          Progress deleted. Please refresh the page to see it.
        </div>}
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Add Progress</h5>
            <label style={{ marginRight: '10px' }}>
              Date:
              <input
                type='date'
                className='form-control form-control-sm'
                value={pendingProgress.date}
                onChange={(event) => {
                  const value = event.target.value
                  this.setState({
                    pendingProgress: {
                      ...pendingProgress,
                      date: value
                    }
                  })
                }}
              />
            </label>
            <label style={{ marginRight: '10px' }}>
              Amount:
              <input
                type='number'
                className='form-control form-control-sm'
                value={pendingProgress.value}
                onChange={(event) => {
                  const value = event.target.value
                  const intValue = parseInt(value, 10)
                  this.setState({
                    pendingProgress: {
                      ...pendingProgress,
                      value: intValue
                    }
                  })
                }}
              />
            </label>
            <button
              className='btn btn-primary btn-sm'
              onClick={this.addProgress}
              disabled={!pendingProgress.date || !pendingProgress.value}
            >
              Add
            </button>
            {progressAdded && <div className='alert alert-success' role='alert'>
              Progress saved. Please refresh the page to see it.
            </div>}
          </div>
        </div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps (state, existingProps) {
  return {
    progressAdded: state.goals.progressAdded,
    progressDeleted: state.goals.progressDeleted,
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
