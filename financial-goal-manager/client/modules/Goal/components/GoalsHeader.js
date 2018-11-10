import React from 'react'
import PropTypes from 'prop-types'
import styles from './Goals.css'

function GoalsHeader (props) {
  const { years } = props

  const headerYear = years.map(year => {
    return <th style={{ textAlign: 'center' }} colSpan={2} key={year}>{year}</th>
  })
  const headerYearSecondary = years.map(year => {
    return [
      <th scope='col' className={styles.goalsProgress} key={`yeargoal${year.year}`}>Goal</th>,
      <th scope='col' key={`yearprogress${year.year}`}>Progress</th>
    ]
  })

  return (
    <thead>
      <tr>
        <th />
        <th />
        {headerYear}
        <th />
      </tr>
      <tr>
        <th scope='col' style={{ textAlign: 'left' }}>Name</th>
        <th scope='col' style={{ textAlign: 'left' }}>Description</th>
        {headerYearSecondary}
        <th />
      </tr>
    </thead>
  )
}

GoalsHeader.propTypes = {
  years: PropTypes.array
}

export default GoalsHeader
