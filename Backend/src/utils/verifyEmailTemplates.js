const verifyEmailTemplate = ({name, url}) => {
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

    <h2 style="color: #4CAF50; text-align: center;">Verify Your Email</h2>

    <p style="font-size: 16px; color: #333;">
      Hi <strong>${name}</strong>,
    </p>

    <p style="font-size: 15px; color: #555;">
      Thank you for signing up! Please verify your email address by clicking the button below.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" 
        style="
          background: #4CAF50;
          color: white;
          padding: 12px 22px;
          text-decoration: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
        ">
        Verify Email
      </a>
    </div>

    <p style="font-size: 14px; color: #777;">
      If you did not create an account, you can safely ignore this email.
    </p>

    <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} Blinkit. All rights reserved.
    </p>
  </div>
  `;
};

export default verifyEmailTemplate;

