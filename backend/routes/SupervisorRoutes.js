import express from "express";

import {

  assignZoneToSupervisor,getSupervisorLocations
} from "../controller/SupervisorController.js";

const router = express.Router();

router.put(
  "/assign-zone",
  assignZoneToSupervisor
);

router.get(
  "/getsupervisor-location/:id",
  getSupervisorLocations
);


export default router;