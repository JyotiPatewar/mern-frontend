// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     mobile: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "supervisor", "driver"],
//       required: true,
//     },

//     otp: {
//       type: String,
//       default: "",
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },

//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);

// export default User;




import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: String,

  mobile: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
  },

  role: {
    type: String,
    enum: ["admin", "supervisor", "driver"],
  },

  zone: {
    type: String,
    enum: [
      "Hostel Zone 1",
      "Hostel Zone 2",
      "Academic Zone",
      "Colony Zone",
    ],
  },

  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],

  otp: String,

  isVerified: {
    type: Boolean,
    default: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("User", userSchema);