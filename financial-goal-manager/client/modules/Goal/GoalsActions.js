import callApi from '../../util/apiCaller'

// Export Constants
export const LOAD_GOALS = 'LOAD_GOALS'
export const ADD_GOAL = 'ADD_GOAL'
export const ADD_PROGRESS = 'ADD_PROGRESS'
export const DELETE_GOAL = 'DELETE_GOAL'
export const DELETE_PROGRESS = 'DELETE_PROGRESS'

// Export Actions
export function addGoal (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

export function loadGoals (goals) {
  return {
    type: LOAD_GOALS,
    goals
  }
}

export function fetchGoals () {
  return (dispatch) => {
    return callApi('goals').then(res => {
      dispatch(loadGoals(res.goals))
    })
  }
}

export function addGoalRequest (goal) {
  return (dispatch) => {
    return callApi('goals/add', { goal }).then(res => dispatch(addGoal(res.goal)))
  }
}

export function addProgress (cuid, progress) {
  return {
    type: ADD_PROGRESS,
    cuid,
    progress
  }
}

export function addProgressRequest (cuid, progress) {
  return (dispatch) => {
    return callApi(`goals/add/progress/${cuid}`).then(res => {
      dispatch(addProgress(cuid, res.progress))
    })
  }
}

export function deleteGoal (cuid) {
  return {
    type: DELETE_GOAL,
    cuid
  }
}

export function deleteGoalequest (cuid) {
  return (dispatch) => {
    return callApi(`goals/delete/${cuid}`).then(() => dispatch(deleteGoal(cuid)))
  }
}

export function deleteProgress (cuid, progress) {
  return {
    type: DELETE_PROGRESS,
    cuid,
    progress
  }
}

export function deleteProgressRequest (cuid, progress) {
  return (dispatch) => {
    return callApi(`goals/delete/progress/${cuid}`).then(res => {
      dispatch(deleteProgress(cuid, res.progress))
    })
  }
}
