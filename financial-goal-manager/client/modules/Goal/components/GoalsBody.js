import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

function GoalsBody (props) {
  const { years, goals } = props

  return (
    <tbody>
      {goals.map(goal => {
        return (
          <tr key={goal._id}>
            <th scope='row'><Link to={`/details/${goal._id}`} >{goal.name}</Link></th>
            <td>{goal.description}</td>
            {years.map(year => {
              const yearGoal = goal.years.find(gy => gy[0].year === year)
              const yearProgress = goal.progress.filter(gp => {
                const progressYear = new Date(gp[0].date).getFullYear()
                return progressYear === year
              })
              const totalProgress = yearProgress.reduce((acc, current) => acc + current[0].value, 0)

              return [
                <td>{yearGoal && yearGoal[0] && yearGoal[0].value}</td>,
                <td>{totalProgress}</td>
              ]
            })}
          </tr>
        )
      }
      )}
    </tbody>
  )
}

GoalsBody.propTypes = {
  years: PropTypes.array,
  goals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    years: PropTypes.array.isRequired,
    progress: PropTypes.array,
    _id: PropTypes.string.isRequired
  }))
}

export default GoalsBody
