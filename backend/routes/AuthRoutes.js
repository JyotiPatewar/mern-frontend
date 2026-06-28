// import express from "express";

// import {
//   sendOtp,
//   verifyOtp,
// } from "../controller/AuthController.js";

// const router = express.Router();

// router.post(
//   "/send-otp",
//   sendOtp
// );

// router.post(
//   "/verify-otp",
//   verifyOtp
// );

// export default router;









import express from "express";

import {
  sendOtp,
 
  verifyOtp,
} from "../controller/AuthController.js";

const router = express.Router();

router.post(
  "/send-otp",
  sendOtp
);



router.post(
  "/verify-email-otp",
  verifyOtp
);

export default router;