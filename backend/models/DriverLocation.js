import mongoose from "mongoose";

const driverLocationSchema = new mongoose.Schema(
    {
      driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      //Latitude (Aadi lines / Horizontal): Yeh batata hai ki aap Earth ke equator (beech ki line) se kitna upar (North) ya neeche (South) hain.
     
       latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const DriverLocation = mongoose.model("DriverLocation",driverLocationSchema);

export default DriverLocation;