// Nơi định nghĩa API
import express from 'express'
import { getUser, login, resetToken, signUp, loginFacebook, forgetCheckMail, forgetCheckCode } from '../controllers/userController.js'
import { upload } from '../config/upload.js'

const userRouter = express.Router()

userRouter.get("/get-user", getUser)

export default userRouter