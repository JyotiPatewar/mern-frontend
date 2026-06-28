import Location from "../models/Location.js";
import User from "../models/User.js";
// export const createLocation = async (req, res) => {
//   try {
//     console.log("REQ BODY =>", req.body);

//     const location = await Location.create(req.body);

//     res.status(201).json(location);

//   } catch (error) {

//     console.log("CREATE LOCATION ERROR =>", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const createLocation = async (req, res) => {
  try {
    const { locationName, zone, latitude, longitude } = req.body;

    // Check if location already exists
    const existingLocation = await Location.findOne({
      locationName: locationName.trim(),
    });

    if (existingLocation) {
      return res.status(400).json({
        success: false,
        message: `Location "${locationName}" is already assigned to ${existingLocation.zone}`,
      });
    }

    const location = await Location.create({
      locationName,
      zone,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      location,
    });
  } catch (error) {
    console.log("CREATE LOCATION ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






export const getLocationsByZone = async (req, res) => {
  try {
    const { zone } = req.params;

    console.log("Zone:", zone);

    const supervisor = await User.findOne({
      role: "supervisor",
      zone,
    });

    console.log("Supervisor:", supervisor);

    const locations = await Location.find({ zone });

    console.log("Locations:", locations);

    res.status(200).json({
      success: true,
      supervisor: supervisor?.name,
      zone,
      locations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};