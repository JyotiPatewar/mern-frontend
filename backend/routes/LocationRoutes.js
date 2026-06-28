import express from "express";
import { createLocation, getAllLocations, getLocationsByZone} from "../controller/LocationController.js";

const router = express.Router();

router.post("/create", createLocation);
router.get("/all", getAllLocations);
router.get("/get-location-by-zone/:zone", getLocationsByZone);


export default router;