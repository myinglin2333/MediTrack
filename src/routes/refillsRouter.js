import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../modules/mongodb-connect.js";

const router = express.Router();

/* GET refill records with pagination */
router.get("/", async (req, res) => {
  try {
    const db = await getDb();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await db.collection("refills").countDocuments();

    const refills = await db.collection("refills")
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      data: refills,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch refill records" });
  }
});

/* POST add refill record */
router.post("/", async (req, res) => {
  try {
    const db = await getDb();

    const newRefill = {
      name: req.body.name,
      refillDate: req.body.refillDate,
      quantity: req.body.quantity,
      pharmacy: req.body.pharmacy,
      notes: req.body.notes || ""
    };

    const result = await db.collection("refills").insertOne(newRefill);

    res.json({
      success: true,
      id: result.insertedId
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to add refill record" });
  }
});

/* PATCH update refill record */
router.patch("/:id", async (req, res) => {
  try {
    const db = await getDb();

    const updateData = {
      name: req.body.name,
      refillDate: req.body.refillDate,
      quantity: req.body.quantity,
      pharmacy: req.body.pharmacy,
      notes: req.body.notes || ""
    };

    await db.collection("refills").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to update refill record" });
  }
});

/* DELETE refill record */
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb();

    await db.collection("refills").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to delete refill record" });
  }
});

export default router;