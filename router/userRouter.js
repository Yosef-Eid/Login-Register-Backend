import express from 'express'
const router = express.Router()

import {
  deleteUser,
  getUserId,
  getUsers,
  login,
  register,
  updateUser,
} from '../controls/userControl.js'
import {
  verifyTokenAndAuthorization,
  verifyTokenIsAdmin,
  verifyTokenUser,
} from '../middlewares/verify.js'

// get all users
router.get('/getUsers', verifyTokenIsAdmin, getUsers)

// get user by id
router.get('/getUser/:id', verifyTokenAndAuthorization, getUserId)

// register new user
router.post('/register', register)

// login
router.post('/login', login)

// update user
router.put('/update/:id', verifyTokenUser, updateUser)

// delete user
router.delete('/delete/:id', verifyTokenUser, deleteUser)

export default router
