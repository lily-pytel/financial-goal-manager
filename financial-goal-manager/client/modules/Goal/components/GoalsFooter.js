import React from 'react'
import PropTypes from 'prop-types'

function GoalsFooter (props) {
  const { years, goalAmounts, goalProgress } = props
  const totalRow = years.map((year, index) => {
    const totalAmount = goalAmounts && goalAmounts.length && goalAmounts[index] &&
      goalAmounts[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const totalProgress = goalProgress && goalProgress.length && goalProgress[index] &&
      goalProgress[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return [
      <th scope='col' key={`amt${year.year}`}>{totalAmount}</th>,
      <th scope='col' key={`progress${year.year}`}>{totalProgress}</th>
    ]
  })

  return (
    <tfoot>
      <tr>
        <th scope='row' style={{ textAlign: 'left' }}>Total</th>
        <th />
        {totalRow}
        <th />
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
