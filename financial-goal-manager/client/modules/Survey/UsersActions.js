import callApi from '../../util/apiCaller'

// Export Constants
export const LOAD_USER = 'LOAD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DISMISS_UPDATE_MESSAGE = 'DISMISS_UPDATE_MESSAGE'

// Export Actions
export function updateUser (users) {
  return {
    type: UPDATE_USER,
    users
  }
}

export function loadUser (users) {
  return {
    type: LOAD_USER,
    users
  }
}

export function dismissUpdateMessageDispatch () {
  return {
    type: DISMISS_UPDATE_MESSAGE
  }
}

export function dismissUpdateMessage () {
  return (dispatch) => {
    return dispatch(dismissUpdateMessageDispatch())
  }
}

export function fetchUser () {
  return (dispatch) => {
    return callApi('user').then(res => {
      dispatch(loadUser(res.users))
    })
  }
}

export function addUserRequest (user) {
  return (dispatch) => {
    return callApi(`user/update`, 'post', { user }).then(res => dispatch(updateUser(res.users)))
  }
}
