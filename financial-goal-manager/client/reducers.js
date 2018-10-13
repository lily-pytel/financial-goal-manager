/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import app from './modules/App/AppReducer'
import posts from './modules/Post/PostReducer'
import goals from './modules/Goal/GoalsReducer'
import intl from './modules/Intl/IntlReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  goals,
  intl
})
