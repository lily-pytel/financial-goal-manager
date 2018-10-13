import { ADD_GOAL, ADD_PROGRESS, DELETE_GOAL, DELETE_PROGRESS } from './GoalActions'

// Initial State
const initialState = { data: [] }

const GoalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GOAL :
      return {
        data: [action.goal, ...state.data]
      }

    case ADD_PROGRESS :
      return {
        data: [...state.data]
      }

    case DELETE_GOAL :
      return {
        data: state.data.filter(goal => goal.cuid !== action.cuid)
      }

    case DELETE_PROGRESS :
      const goal = state.data.filter(goal => goal.cuid !== action.cuid)

      if (goal) {
        goal.progress.filter(entry => entry.date !== action.date && entry.value !== action.value)

        return {
          data: [goal, ...state.data]
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

// Get goal by cuid
export const getGoal = (state, cuid) => state.goals.data.filter(goal => goal.cuid === cuid)[0]

// Export Reducer
export default GoalReducer