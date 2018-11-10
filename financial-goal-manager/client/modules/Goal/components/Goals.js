import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'
import GoalsHeader from './GoalsHeader'
import GoalsFooter from './GoalsFooter'
import GoalsBody from './GoalsBody'
import styles from './Goals.css'

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

function Goals (props) {
  const { goals } = props
  const yearsObjects = goals.map(goal => goal.years)
  const yearsArray = [].concat.apply([], yearsObjects)
  const years = [...new Set(yearsArray.map(year => year[0].year))]
    .sort((a, b) => a - b)

  const firstYear = years && years.length && years[0]
  const lastYear = years && years.length && years[years.length - 1]

  const goalAmounts = years.map(year => {
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

  const goalProgress = years.map(year => {
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

  config.subtitle = { text: `from ${firstYear} to ${lastYear}` }
  config.xAxis = { ...config.xAxis, categories: years }
  config.series = [
    { name: 'Goal', color: '#419CA7', data: goalAmounts },
    { name: 'Progress', color: '#8BA251', data: goalProgress }
  ]

  return (
    <div>
      <ReactHighcharts config={config} />
      <table className={`table table-striped ${styles.goalsTable}`}>
        <GoalsHeader years={years} />
        <GoalsBody years={years} goals={goals} />
        <GoalsFooter years={years} goalAmounts={goalAmounts} goalProgress={goalProgress} />
      </table>
    </div>
  )
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
