import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../db/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplates.js";
import generateAccessToken from "../utils/genratedAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageClodinary.js";



//register user controller
export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body || {};

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "please enter name email password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      return response.status(400).json({
        message: "user already exists with this email",
        error: true,
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const verifyEmailurl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "verify email from blinkit",
      html: verifyEmailTemplate({
        name: name,
        url: verifyEmailurl,
      }),
    });
    return response.status(201).json({
      message: "user register successfully",
      error: false,
      success: true,
      data: newUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//verify email controller
export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;
    const user = await userModel.findOne({ _id: code });
    if (!user) {
      return response.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }
    const updateUser = await userModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return response.status(201).json({
      message: "email verify successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

//login user controller
export async function loginUserController(request, response) {
  try {  
    const { email, password } = request.body;
    if(!email,!password){
        return response.status(400).json({
            message : "please provide email and password",
            error : true,
            success : false,
        })
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "userNot exist please register",
        error: true,
        success: false,
      });

    }

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Your account Inactive/Suspended pls contact admin",
        error: true,
        success: false,
      });
    }

    const cheakPassword = await bcrypt.compare(password, user.password);

    if (!cheakPassword) {
      return response.status(401).json({
        message: "Invlaid password pls cheakPassword",
        error: true,
        success: false,
      });

    }

    const accessToken = await generateAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id)

     const cookiesOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
     }

    response.cookie("accessToken",accessToken,cookiesOption)
    response.cookie("refreshToken",refreshToken,cookiesOption)

    return response.status(200).json({
        message : "Login successfully",
        error : "false",
        success :true,
        data :{
            accessToken,
            refreshToken
        }
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


// logout user Controller
export async function logoutController(request,response) {
     try {
      const userId =request.userId // This is set by the auth middleware
        const cookiesOption = { 
        httpOnly : true, 
        secure : true, 
        sameSite : "None" 
     }
       response.clearCookie("accessToken",cookiesOption)
       response.clearCookie("refreshToken",cookiesOption)
       
       const removeRefreshToken= await userModel.findByIdAndUpdate(userId,{
        refresh_token : ""
       })
       return response.json({
        message : "user Logout successfully",
        error : false,
        success : true
       })

     } catch (error) {
      return response.status(500).json({
         message : error.message || error,
         error : true ,
         success : false
      })
     }
}

// upload user avatar

export async function avatarController(request, response) {
 try {
    const userId = request.userId; // set by auth middleware
    const image = request.file; // middleware multer use to upload image

      if (!image) {
      return response.status(400).json({
        message: "Image file is required",
        error: true,
        success: false,
      });
    }
    const upload = await uploadImageCloudinary(image)
    const updateUser = await userModel.findByIdAndUpdate(userId,{
      avatar : upload.url
    })

  return response.json({
    message : "upload profile",
    data : {
      _id : userId,
      avatar : upload.url,
    }
  })
  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
  
}

