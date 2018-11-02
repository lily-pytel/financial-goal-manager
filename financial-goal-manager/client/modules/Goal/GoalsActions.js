import callApi from '../../util/apiCaller'

// Export Constants
export const LOAD_GOALS = 'LOAD_GOALS'
export const ADD_GOAL = 'ADD_GOAL'
export const ADD_PROGRESS = 'ADD_PROGRESS'
export const DELETE_GOAL = 'DELETE_GOAL'
export const DELETE_PROGRESS = 'DELETE_PROGRESS'
export const OPEN_GOAL_MODAL = 'OPEN_GOAL_MODAL'
export const CLOSE_GOAL_MODAL = 'CLOSE_GOAL_MODAL'

// Export Actions
export function openGoalModal (goal) {
  return {
    type: OPEN_GOAL_MODAL,
    goal
  }
}

export function closeGoalModal () {
  return {
    type: CLOSE_GOAL_MODAL
  }
}

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
    return callApi('goals/add', 'post', { goal }).then(res => {
      dispatch(addGoal(res.goal))
    })
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
    return callApi(`goals/progress/add/${cuid}`, 'post', { progress }).then(res => {
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
    return callApi(`goals/delete/${cuid}`, 'post').then(() => dispatch(deleteGoal(cuid)))
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
    return callApi(`goals/progress/delete/${cuid}`, 'post', { progress }).then(res => {
      dispatch(deleteProgress(cuid, res.progress))
    })
  }
}
