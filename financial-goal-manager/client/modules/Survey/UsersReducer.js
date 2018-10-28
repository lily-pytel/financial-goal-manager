import { LOAD_USER, UPDATE_USER, DISMISS_UPDATE_MESSAGE } from './UsersActions'

// Initial State
const initialState = { data: [], userSaved: false }

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER :
      return {
        data: action.users
      }

    case UPDATE_USER :
      return {
        userSaved: true,
        data: action.users
      }

    case DISMISS_UPDATE_MESSAGE:
      return {
        ...state,
        userSaved: false
      }

    default:
      return state
  }
}

/* Selectors */

// Get all users
export const getUsers = state => state.users.data

// Get user by cuid
export const getUser = state => state.users && state.users.data && state.users.data.length
  ? state.users.data[0]
  : null

// Export Reducer
export default UsersReducer
