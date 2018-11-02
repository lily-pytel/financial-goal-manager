import { LOAD_GOALS, ADD_GOAL, ADD_PROGRESS, DELETE_GOAL, DELETE_PROGRESS } from './GoalsActions'

// Initial State
const initialState = { data: [], progressAdded: null, progressDeleted: null }

const GoalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GOALS :
      return {
        data: action.goals.sort((a, b) => a.name.localeCompare(b.name))
      }

    case ADD_GOAL :
      const newGoals = [action.goal, ...state.data]
      let sortedNewGoals = newGoals.sort((a, b) => a.name.localeCompare(b.name))
      return {
        data: sortedNewGoals,
        progressAdded: false,
        progressDeleted: false
      }

    case ADD_PROGRESS :
      let newGoalsAddProgress = state.data.filter(goal => goal._id !== action.cuid)
      const goalToAdd = state.data.find(goal => goal._id === action.cuid)

      if (goalToAdd) {
        goalToAdd.progress.push(action.progress)

        newGoalsAddProgress.push(goalToAdd)
        newGoalsAddProgress = newGoalsAddProgress.sort((a, b) => a.name.localeCompare(b.name))

        return {
          data: newGoalsAddProgress,
          progressAdded: true,
          progressDeleted: false
        }
      }

      return state

    case DELETE_GOAL :
      return {
        data: state.data.filter(goal => goal._id !== action.cuid),
        progressAdded: false,
        progressDeleted: false
      }

    case DELETE_PROGRESS :
      let newGoalsDeleteProgress = state.data.filter(goal => goal._id !== action.cuid)
      const goalWithProgressToDelete = state.data.find(goal => goal._id === action.cuid)

      if (goalWithProgressToDelete) {
        goalWithProgressToDelete.progress = goalWithProgressToDelete.progress
          .filter(entry => entry && entry[0])
          .filter(entry => entry[0].date !== action.date && entry[0].value !== action.value)

        newGoalsDeleteProgress.push(goalWithProgressToDelete)
        newGoalsDeleteProgress = newGoalsDeleteProgress.sort((a, b) => a.name.localeCompare(b.name))

        return {
          data: newGoalsDeleteProgress,
          progressAdded: false,
          progressDeleted: true
        }
      }

      return state

    default:
      return state
  }
}

/* Selectors */

// Get all goals
export const getGoals = state => state.goals.data

// Get goal by id
export const getGoal = (state, id) => state.goals.data.filter(goal => goal._id === id)[0]

// Export Reducer
export default GoalReducer
