import { Router } from 'express'
import * as UserController from '../controllers/user.controller'
const router = new Router()

// Get user
router.route('/user').get(UserController.getUsers)

// Add or update user
router.route('/user/update').post(UserController.updateUser)

export default router
