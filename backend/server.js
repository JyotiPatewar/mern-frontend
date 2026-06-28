import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { conn } from "./conn/conn.js";
import RequestRoutes from "./routes/RequestRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import LocationRoutes from "./routes/LocationRoutes.js";
import DriverRoutes from "./routes/DriverRoutes.js";
import SupervisorRoutes from "./routes/SupervisorRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

conn();

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/emergency",RequestRoutes);
app.use("/api/location",LocationRoutes);
app.use("/api/driver",DriverRoutes);
app.use("/api/supervisor",SupervisorRoutes);




app.listen(process.env.PORT, () => {
  console.log(
    `Server Started On Port ${process.env.PORT}`
  );
});















