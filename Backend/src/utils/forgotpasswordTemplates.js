const forgotPasswordTemplets = ({name,otp})=>{
     return `
  <div style="
      font-family: Arial, sans-serif;
      max-width: 550px;
      margin: auto;
      border: 1px solid #e6e6e6;
      padding: 25px;
      border-radius: 10px;
      background: #ffffff;
    ">

    <h2 style="color: #FF5722; text-align: center;">Reset Your Password</h2>

    <p style="font-size: 16px; color: #333;">
      Hi <strong>${name}</strong>,
    </p>

    <p style="font-size: 15px; color: #555;">
      We received a request to reset your password.  
      Please use the OTP below to continue.
    </p>

    <div style="
        text-align: center;
        margin: 30px 0;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 6px;
        color: #000;
      ">
      ${otp}
    </div>

    <p style="font-size: 14px; color: #777; text-align: center;">
      This OTP is valid for <strong>5 minutes</strong>.
    </p>

    <p style="font-size: 14px; color: #777;">
      If you did not request a password reset, please ignore this email.
    </p>

    <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Blinkit. All rights reserved.
    </p>
  </div>
  `;
}

export default forgotPasswordTemplets