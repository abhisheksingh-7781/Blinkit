import {Router} from 'express'
import { registerUserController, verifyEmailController,loginUserController, logoutController, avatarController } from '../controllers/user.controller.js'
import auth from '../middleware/auth.middleware.js'
import upload from '../middleware/multer.js'


const userRouter = Router()

//register user
userRouter.post("/register",registerUserController)
//verify email
userRouter.post("/verifyEmail",verifyEmailController)
//login user
userRouter.post("/login",loginUserController)
//logout user
userRouter.get("/logout",auth,logoutController)

userRouter.put("/upload-avatar",auth,upload.single("avatar"),avatarController)



export default userRouter;