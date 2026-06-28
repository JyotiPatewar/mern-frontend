import User from "../models/User.js";
import jwt from "jsonwebtoken";
// import twilio from "twilio";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================
// SEND OTP
// ======================
// export const sendOtp = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     const user = await User.findOne({ mobile });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//      console.log("Mo",user.mobile);

//     const verification = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SERVICE_SID)
//       .verifications.create({
       
//         to: `+91${mobile}`,
//         channel: "sms",
//       });

//     console.log(
//       "Verification SID:",
//       verification.sid
//     );

//     return res.status(200).json({
//       message: "OTP Sent Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       message: error.message,
//     });

//   }
// };


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save OTP in DB
    user.otp = otp;
    await user.save();

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "CleanTrack Login OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>CleanTrack Verification</h2>
          <p>Your OTP for login is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to email",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// export const verifyOtp = async (req, res) => {


//   try {

//     const { mobile, otp } = req.body;

//     const verificationCheck =
//       await client.verify.v2
//         .services(
//           process.env.TWILIO_VERIFY_SERVICE_SID
//         )
//         .verificationChecks.create({
//           to: `+91${mobile}`,
//           code: otp,
//         });

//     if (
//       verificationCheck.status !==
//       "approved"
//     ) {
//       return res.status(400).json({
//         message: "Invalid OTP",
//       });
//     }

//     const user = await User.findOne({
//       mobile,
//     });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.isVerified = true;

//     await user.save();

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "30d",
//       }
//     );

//   return res.status(200).json({
//   success: true,
//   message: "Login Success",
//   token,
//   role: user.role,
//   user,
// });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       message: error.message,
//     });

//   }
// };


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = "";

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: user.role,
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
