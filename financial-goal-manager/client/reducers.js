/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import app from './modules/App/AppReducer'
import goals from './modules/Goal/GoalsReducer'
import users from './modules/Survey/UsersReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  goals,
  users
})
