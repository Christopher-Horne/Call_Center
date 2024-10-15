import {Router} from 'express'
import { UserController } from '../controllers/user.controller.js'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/get/user/:id', UserController.getLoggedInUser)
router.put('/update/user/:id', UserController.updateUser)
router.delete('/delete/user/:id', UserController.deleteUser)



export default router