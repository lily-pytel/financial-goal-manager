import React from 'react'
import PropTypes from 'prop-types'

function Goals (props) {
  return (
    <div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Description</th>
            <th scope='col'>Years</th>
            <th scope='col'>Progress</th>
          </tr>
        </thead>
        <tbody>
          {props.goals.map(goal =>
            <tr key={goal._id}>
              <th scope='row'>{goal.name}</th>
              <td>{goal.description}</td>
              <td>{goal.years.length}</td>
              <td>{goal.progress.length}</td>
            </tr>
          )}
        </tbody>
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
