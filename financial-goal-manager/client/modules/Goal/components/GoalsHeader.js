import React from 'react'
import PropTypes from 'prop-types'

function GoalsHeader (props) {
  const { years } = props

  const headerYear = years.map(year => {
    return <th style={{ textAlign: 'center' }} colSpan={2} key={year}>{year}</th>
  })
  const headerYearSecondary = years.map(year => {
    return [
      <th scope='col' style={{ width: '100px' }} key={`yeargoal${year.year}`}>Goal</th>,
      <th scope='col' style={{ width: '100px' }} key={`yearprogress${year.year}`}>Progress</th>
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
        <th scope='col'>Name</th>
        <th scope='col'>Description</th>
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
