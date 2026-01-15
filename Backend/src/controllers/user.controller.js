import  jwt  from 'jsonwebtoken';
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../db/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplates.js";
import generateAccessToken from "../utils/genratedAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageClodinary.js";
import generatedOtp from "./../utils/generateotp.js";
import forgotPasswordTemplets from "../utils/forgotpasswordTemplates.js";



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
    if ((!email, !password)) {
      return response.status(400).json({
        message: "please provide email and password",
        error: true,
        success: false,
      });
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

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateUser = await userModel.findByIdAndUpdate(user?._id,{
      last_login_date : new Date()
    })

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.status(200).json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// logout user Controller
export async function logoutController(request, response) {
  try {
    const userId = request.userId; // This is set by the auth middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await userModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });
    return response.json({
      message: "user Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// upload user avatar controller
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
    
    const upload = await uploadImageCloudinary(image);
    const updateUser = await userModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      message: "upload profile",
      success: true,
      error: false,    
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// update user details controller
export async function updateDetailsController(request, response) {
  try {
    const userId = request.userId; // set by auth middleware
    const { name, email, mobile, password } = request.body;
    let hashedPassword = "";

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateUser = await userModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashedPassword }),
      }
    );

    return response.json({
      message: "updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}    

// forget password controller not login user
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body || {};

    if (!email) {
      return response.status(400).json({
        message: "Please enter email ",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000; // 1hr
    const update = await userModel.findOneAndUpdate(
      { email },
      {
        forgot_password_otp: otp,
        forgot_password_expiry: new Date(expireTime).toISOString(),
      }
    );

    await sendEmail({
      sendTo: email,
      subject: " Forgot password from blinkit",
      html: forgotPasswordTemplets({
        name: user.name,
        otp: otp,
      }),
    });
    return response.json({
      message: "check your email ",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// verify forgot password otp controller
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        message: "provide required field email otp",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return response.status(400).json({
        message: "otp is expired",
        error: true,
        success: false,
      });
    }
    if (otp !== user.forgot_password_otp) {
      return response.status(404).json({
        message: "invlaid otp",
        error: true,
        success: false,
      });
    }

    // if otp is not expired
    //  otp === user.forgot_password_otp
    const updateUser = await userModel.findOneAndUpdate(user?._id,{
      forgot_password_otp : "",
      forgot_password_expiry : ""
    })

    return response.json({
      message: "verify otp successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// reset password controller
export async function resetpassword(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: " provide required fields email newPassword confirmPassword",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "newPassword and confirmPassword not match",
        error: true,
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await userModel.findOneAndUpdate(user._id, {
      password: hashedPassword,
    });
    return response.status(200).json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


// refresh token controller 
// export async function refreshToken(request, response) {
//   try {

//     const refreshToken =             
//       request.cookies.refreshToken ||
//       request?.headers?.authorization?.split(" ")[1]; // [Bearer Token]

//     if (!refreshToken) {
//       return response.status(401).json({
//         message: "Invalid Token",
//         error: true,
//         success: false,
//       });
//     }
//      const verifyToken = await jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_SECRET)
//      if(!verifyToken){
//       return response.status(401).json({
//         message : "token is expire",
//         error : true ,
//         success : false
//       })
//      }
     
//      const userId = verifyToken?.id;
 
    
//      const newAccessToken = await generateAccessToken(userId)
//          const cookiesOption = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     };
//     response.cookie("accessToken",newAccessToken,cookiesOption)
//      return response.status(201).json({
//       message : "New access Token  generated",
//       error : false,
//       success : true,
//       data : {
//         accessToken : newAccessToken
//       }
//      })
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// }

export async function refreshToken(request, response) {
  try {
    // ✅ ONLY from HttpOnly cookie
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      return response.status(401).json({
        message: "Refresh token missing",
        error: true,
        success: false,
      });
    }

    // jwt.verify throws error if invalid/expired
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const userId = decoded.id;

    const newAccessToken = await generateAccessToken(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,          // https required
      sameSite: "None",      // cross-site cookie
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: "/",
    };

    response.cookie("accessToken", newAccessToken, cookieOptions);

    return response.status(200).json({
      message: "New access token generated",
      success: true,
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });

  } catch (error) {
    return response.status(401).json({
      message: "Refresh token expired or invalid",
      error: true,
      success: false,
    });
  }
}


// get login user details controller

export async function getUserLoginDetails(request, response) {
  try {
    const userId = request.userId; // set by auth middleware
    const user = await userModel.findById(userId).select("-password -__v");  
    return response.status(200).json({
      message: "user details fetch successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    }); 
  }
}



                  