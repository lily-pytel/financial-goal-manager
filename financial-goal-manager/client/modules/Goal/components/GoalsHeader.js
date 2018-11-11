import React from 'react'
import PropTypes from 'prop-types'
import styles from './Goals.css'

function GoalsHeader (props) {
  const { years } = props

  const headerYear = years.map(year => {
    return (
      <th
        className={styles.noBorder}
        style={{ textAlign: 'center' }}
        colSpan={2}
        key={year}
      >
        {year}
      </th>
    )
  })
  const headerYearSecondary = years.map(year => {
    return [
      <th scope='col' key={`yeargoal${year.year}`}>Goal</th>,
      <th scope='col' key={`yearprogress${year.year}`} className={styles.noBorder}>Progress</th>
    ]
  })

  return (
    <thead>
      <tr>
        <th className={styles.noBorder} colSpan={2} />
        {headerYear}
        <th className={styles.noBorder} />
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
