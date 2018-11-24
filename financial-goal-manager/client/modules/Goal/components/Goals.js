import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'
import GoalsHeader from './GoalsHeader'
import GoalsFooter from './GoalsFooter'
import GoalsBody from './GoalsBody'
import styles from './Goals.css'
import { debt } from '../../../util/constants'

const config = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'All My Goals'
  },
  xAxis: {
    crosshair: true,
    title: {
      text: 'Year'
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Amount'
    }
  }
}

class Goals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      goalType: 'savings'
    }
  }

  componentWillMount () {
    this.filterGoalsByType = this.filterGoalsByType.bind(this)
    this.getGoalAmounts = this.getGoalAmounts.bind(this)
    this.getGoalProgress = this.getGoalProgress.bind(this)
  }

  filterGoalsByType () {
    const { goals } = this.props
    const { goalType } = this.state

    if (goalType === 'debt') {
      return goals.filter(g => debt.includes(g.type))
    }

    return goals.filter(g => !debt.includes(g.type))
  }

  getGoalAmounts (goals, years) {
    return years.map(year => {
      const allGoals = goals
        .map(g => g.years)
        .map(g => g.map(i => i[0]))
        .map(g => {
          const goalPerYear = g.find(y => y.year === year)
          return (goalPerYear && goalPerYear.value) || 0
        })
      const totalGoal = allGoals
        .reduce((acc, current) => acc + current, 0)

      return totalGoal
    })
  }

  getGoalProgress (goals, years) {
    return years.map(year => {
      const allProgressess = goals.map(g => g.progress)
      const progressesForCurrentYearOrBefore = allProgressess
        .map(p => p.filter(entry => new Date(entry[0].date).getFullYear() === year))
      const totalProgress = progressesForCurrentYearOrBefore
        .map(p => {
          const sortedProgress = p.sort((a, b) => {
            const dateA = new Date(a[0].date)
            const dateB = new Date(b[0].date)
            return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
          })
          return (sortedProgress && sortedProgress.length && sortedProgress[0][0].value) || 0
        })
        .reduce((acc, current) => acc + current, 0)

      return totalProgress
    })
  }

  render () {
    const { goalType } = this.state
    const goals = this.filterGoalsByType()
    const yearsObjects = goals.map(goal => goal.years)
    const yearsArray = [].concat.apply([], yearsObjects)
    const years = [...new Set(yearsArray.map(year => year[0].year))]
      .sort((a, b) => a - b)
    const firstYear = years && years.length && years[0]
    const lastYear = years && years.length && years[years.length - 1]
    const goalAmounts = this.getGoalAmounts(goals, years)
    const goalProgress = this.getGoalProgress(goals, years)

    config.title.text = goalType === 'debt'
      ? 'My Debt Reduction Goals'
      : 'My Savings Goals'
    config.subtitle = { text: `from ${firstYear} to ${lastYear}` }
    config.xAxis = { ...config.xAxis, categories: years }
    config.series = [
      { name: 'Goal', color: '#419CA7', data: goalAmounts },
      { name: 'Progress', color: '#8BA251', data: goalProgress }
    ]

    return (
      <div>
        <ReactHighcharts config={config} />
        <div>
          <label style={{ marginTop: '6px', marginRight: '10px', fontWeight: 'bold' }}>Goal Type: </label>
          <div class='btn-group btn-group-sm' role='group' aria-label='Goal Type'>
            <button
              type='button'
              class={`btn ${goalType === 'savings' ? 'btn-secondary' : 'btn-light'}`}
              onClick={() => this.setState({ goalType: 'savings' })}
              style={{ borderColor: '#545b62', width: '65px' }}
            >
              Savings
            </button>
            <button
              type='button'
              class={`btn ${goalType === 'debt' ? 'btn-secondary' : 'btn-light'}`}
              onClick={() => this.setState({ goalType: 'debt' })}
              style={{ borderColor: '#545b62', width: '65px' }}
            >
              Debt
            </button>
          </div>
        </div>
        <table className={`table table-striped ${styles.goalsTable}`}>
          <GoalsHeader years={years} />
          <GoalsBody years={years} goals={goals} />
          <GoalsFooter years={years} goalAmounts={goalAmounts} goalProgress={goalProgress} />
        </table>
      </div>
    )
  }
}

Goals.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    years: PropTypes.array.isRequired,
    progress: PropTypes.array,
    _id: PropTypes.string.isRequired
  }))
}

export default Goals
