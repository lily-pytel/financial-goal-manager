import { Router } from 'express'
import * as GoalController from '../controllers/goal.controller'
const router = new Router()

// Get all Goals
router.route('/goals').get(GoalController.getGoals)

// Get one goal by cuid
router.route('/goals/:cuid').get(GoalController.getGoal)

// Add a new Goal
router.route('/goals/add').post(GoalController.addGoal)

// Add progress to a Goal
router.route('goals/add/progress').post(GoalController.addProgress)

// Delete a goal by cuid
router.route('/goals/delete/:cuid').delete(GoalController.deleteGoal)

// Delete progress from a Goal
router.route('goals/delete/progress/:cuid').post(GoalController.deleteProgress)

export default router
