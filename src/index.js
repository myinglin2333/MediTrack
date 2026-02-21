import express from "express";
import cors from "cors";
import { connectDatabase } from "./modules/mongodb-connect.js";
import medicationsRouter from "./routes/medicationsRouter.js";
import refillsRouter from "./routes/refillsRouter.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

app.use("/api/medications", medicationsRouter);
app.use("/api/refillrecords", refillsRouter);

app.get("/", (req, res) => {
  res.send("MediTrack API running");
});

const PORT = process.env.PORT || 3000;await connectDatabase();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
