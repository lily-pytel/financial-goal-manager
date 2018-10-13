/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import app from './modules/App/AppReducer'
import goals from './modules/Goal/GoalsReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  goals
})
