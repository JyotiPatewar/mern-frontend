import express from "express";
import { createEmergencyRequest , getAllEmgReq , updateScheduleOrder,getMyEmergencyRequests } from "../controller/RequestController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", createEmergencyRequest);
router.get("/getAllEmgReq",  getAllEmgReq);
router.put("/schedule-req/:id",  updateScheduleOrder);
router.get("/my-requests/:supervisorId",  getMyEmergencyRequests);


export default router;