import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../modules/mongodb-connect.js";

const router = express.Router();

/* GET medications with pagination */
router.get("/", async (req, res) => {
  try {
    const db = await getDb();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await db.collection("medications").countDocuments();

    const meds = await db
      .collection("medications")
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      data: meds,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medications" });
  }
});

/* POST add medication */
router.post("/", async (req, res) => {
  try {
    const db = await getDb();

    const newMed = {
      name: req.body.name,
      dosage: req.body.dosage,
      schedule: req.body.schedule,
      notes: req.body.notes || "",
      takenToday: false,
      takenAt: null,
    };

    const result = await db.collection("medications").insertOne(newMed);

    res.json({
      success: true,
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add medication" });
  }
});

/* DELETE medication */
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb();

    await db.collection("medications").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medication" });
  }
});

/* PATCH toggle taken */
router.patch("/:id/taken", async (req, res) => {
  try {
    const db = await getDb();

    const newStatus = req.body.takenToday === true;

    await db.collection("medications").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          takenToday: newStatus,
          takenAt: newStatus ? new Date() : null,
        },
      },
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update medication" });
  }
});

export default router;
