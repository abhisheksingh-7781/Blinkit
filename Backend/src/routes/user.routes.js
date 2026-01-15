import {Router} from 'express'
import auth from '../middleware/auth.middleware.js'
import upload from '../middleware/multer.js'
import { 
    registerUserController, verifyEmailController,
    loginUserController, logoutController, avatarController,
    updateDetailsController, forgotPasswordController, 
    verifyForgotPasswordOtp,
    resetpassword,
    refreshToken,
    getUserLoginDetails
} from '../controllers/user.controller.js'



const userRouter = Router()

//register user
userRouter.post("/register",registerUserController)

//verify email
userRouter.post("/verifyEmail",verifyEmailController)

//login user
userRouter.post("/login",loginUserController)

//logout user
userRouter.get("/logout",auth,logoutController)

// upload avatar
userRouter.put("/upload-avatar",auth,upload.single("avatar"),avatarController)

// update user details
userRouter.put("/update-user",auth,updateDetailsController)

// forget password routes
userRouter.post("/forgot-Password",forgotPasswordController)

// verify forgot password otp routes
userRouter.put("/verify-forgot-password-otp",verifyForgotPasswordOtp)

// reset password routes
userRouter.put("/reset-password",resetpassword)

// refresh token route  
userRouter.get("/refresh-token",refreshToken)

// get login user details
userRouter.get("/login-user-details",auth,getUserLoginDetails)


export default userRouter;