import express from "express";
import {
  getTodayScheduledRequests,
  markAsArrived,
  markAsCompleted, getCompletedTasks
} from "../controller/DriverController.js";

const router = express.Router();

router.get("/today-task", getTodayScheduledRequests);

router.put("/arrived/:id", markAsArrived);

router.put("/completed/:id", markAsCompleted);

router.get("/completed", getCompletedTasks);

export default router;