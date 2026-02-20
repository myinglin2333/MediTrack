import express from "express";
import cors from "cors";
import { connectDatabase } from "./modules/mongodb-connect.js";
import medicationsRouter from "./routes/medicationsRouter.js";
import refillsRouter from "./routes/refillsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medications", medicationsRouter);
app.use("/api/refillrecords", refillsRouter);

app.get("/", (req, res) => {
  res.send("MediTrack API running");
});

const PORT = 3000;
await connectDatabase();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});