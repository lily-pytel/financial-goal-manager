import React from 'react'
import PropTypes from 'prop-types'

function GoalsFooter (props) {
  const { years, goalAmounts, goalProgress } = props
  const totalRow = years.map((year, index) => {
    return [
      <th scope='col' key={`amt${year.year}`}>{goalAmounts && goalAmounts.length && goalAmounts[index]}</th>,
      <th scope='col' key={`progress${year.year}`}>{goalProgress && goalProgress.length && goalProgress[index]}</th>
    ]
  })

  return (
    <tfoot>
      <tr>
        <th scope='row'>Total</th>
        <th />
        {totalRow}
      </tr>
    </tfoot>
  )
}

GoalsFooter.propTypes = {
  year: PropTypes.array,
  goalAmounts: PropTypes.array,
  goalProgress: PropTypes.array
}

export default GoalsFooter
