import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import hotelsRouter from "./routes/hotels.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hotels", hotelsRouter);

export default app;
