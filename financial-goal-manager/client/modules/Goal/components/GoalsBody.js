import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

import NewGoal from './NewGoal'

import { deleteGoalequest } from '../GoalsActions'

class GoalsBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goalModalOpen: false
    }
  }

  componentWillMount () {
    this.setModalStatus = this.setModalStatus.bind(this)
  }

  setModalStatus (modalName, modalStatus) {
    this.setState({ [modalName]: modalStatus })
  }

  render () {
    const { goalModalOpen } = this.state
    const { years, goals, dispatch } = this.props

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
                  <td key={`inner${year}goal`}>{yearGoal && yearGoal[0] && yearGoal[0].value}</td>,
                  <td key={`inner${year}progress`}>{totalProgress !== 0 ? totalProgress : ''}</td>
                ]
              })}
              <td>
                <button className='btn btn-link' onCancel={() => this.setModalStatus('goalModalOpen', true)}><FaPen /></button>
                <NewGoal
                  modalOpen={goalModalOpen}
                  onSubmit={() => {}}
                  onCancel={() => this.setModalStatus('goalModalOpen', false)}
                />
                |
                <button className='btn btn-link' onClick={() => dispatch(deleteGoalequest(goal._id))}><FaTrashAlt /></button>
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
