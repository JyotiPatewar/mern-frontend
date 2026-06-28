import mongoose from "mongoose";

const emergencyRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "High",
    },


    status: {
      type: String,
      enum: [
        "Pending",      // Request Created
        "Scheduled",    // Driver scheduled visit
        "Arrived",
        "Completed",    // Work completed
      ],
      default: "Pending",
    },

isOverdue: {
  type: Boolean,
  default: false,
},


    // Driver Details
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    arrivedAt: {
      type: Date,
    },

    scheduledDate: {
      type: String,
    },

    scheduledTime: {
      type: String,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const EmergencyRequest = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);

export default EmergencyRequest;