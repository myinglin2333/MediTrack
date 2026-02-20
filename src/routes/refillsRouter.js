import express from "express";

const router = express.Router();

/* temporary test route */
router.get("/", (req, res) => {
  res.json({ message: "Refills route working" });
});

export default router;