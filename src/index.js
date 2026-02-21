import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDatabase } from "./modules/mongodb-connect.js";
import medicationsRouter from "./routes/medicationsRouter.js";
import refillsRouter from "./routes/refillsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

/* ===== Fix __dirname for ES modules ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== Serve frontend ===== */
app.use(express.static(path.join(__dirname, "../frontend")));

/* ===== API routes ===== */
app.use("/api/medications", medicationsRouter);
app.use("/api/refillrecords", refillsRouter);

/* ===== Homepage route ===== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* ===== Start server ===== */
const PORT = process.env.PORT || 3000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
