import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import styles from './Goals.css'

import { deleteGoalequest, openGoalModal } from '../GoalsActions'

class GoalsBody extends Component {
  render () {
    const { years, goals, dispatch } = this.props

    return (
      <tbody>
        {goals.map(goal => {
          return (
            <tr key={goal._id}>
              <th scope='row' style={{ textAlign: 'left' }}>
                <Link to={`/details/${goal._id}`} >{goal.name}</Link>
              </th>
              <td style={{ textAlign: 'left' }}>{goal.description}</td>
              {years.map(year => {
                const yearGoal = goal.years.find(gy => gy[0].year === year)
                const sortedProgress = goal.progress
                  .filter(gp => gp)
                  .map(gp => gp[0])
                  .filter(gp => new Date(gp.date).getFullYear() === year)
                  .sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)
                    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
                  })
                const lastProgress = sortedProgress && sortedProgress.length && sortedProgress[0].value &&
                  sortedProgress[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                const goalAmount = yearGoal && yearGoal[0] && yearGoal[0].value &&
                  yearGoal[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                return [
                  <td key={`inner${year}goal`}>{goalAmount}</td>,
                  <td className={styles.noBorder} key={`inner${year}progress`}>{lastProgress !== 0 ? lastProgress : ''}</td>
                ]
              })}
              <td className={styles.goalsProgress}>
                <button title='Edit' className='btn btn-link' onClick={() => dispatch(openGoalModal(goal))}>
                  <FaPen />
                </button>
                |
                <button title='Delete' className='btn btn-link' onClick={() => dispatch(deleteGoalequest(goal._id))}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          )
        }
        )}
      </tbody>
    )
  }
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
  })),
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(GoalsBody)
