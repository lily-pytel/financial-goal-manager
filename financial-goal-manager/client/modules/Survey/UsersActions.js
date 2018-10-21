import callApi from '../../util/apiCaller'

// Export Constants
export const LOAD_USER = 'LOAD_USER'
export const UPDATE_USER = 'UPDATE_USER'

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
