import dotenv from "dotenv";
import { connectDatabase, getDb } from "./modules/mongodb-connect.js";

dotenv.config();

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

async function seed() {
  await connectDatabase();
  const db = getDb();

  console.log("Seeding database...");

  /* Medication data */
  const names = [
    "Vitamin D",
    "Ibuprofen",
    "Aspirin",
    "Metformin",
    "Antibiotic",
    "Omega 3",
    "Calcium",
    "Melatonin",
    "Probiotic",
    "Cough Syrup",
  ];

  const schedules = ["Morning", "Noon", "Evening", "Night"];
  const notes = [
    "Take after meal",
    "Before sleep",
    "Drink water",
    "Doctor recommended",
    "Short course",
    "",
    "",
    "",
  ];

  const medications = [];

  for (let i = 0; i < 1000; i++) {
    const taken = Math.random() > 0.5;

    medications.push({
      name: randomFrom(names),
      dosage: `${Math.ceil(Math.random() * 3)} pill`,
      schedule: randomFrom(schedules),
      notes: randomFrom(notes),
      takenToday: taken,
      takenAt: taken ? randomDate(new Date(2025, 0, 1), new Date()) : null,
    });
  }

  await db.collection("medications").deleteMany({});
  await db.collection("medications").insertMany(medications);

  console.log("Inserted medications");

  /* Refill data */
  const pharmacies = [
    "CVS",
    "Walgreens",
    "Rite Aid",
    "Hospital Pharmacy",
    "Local Pharmacy",
  ];

  const refills = [];

  for (let i = 0; i < 1000; i++) {
    refills.push({
      name: randomFrom(names),
      quantity: Math.ceil(Math.random() * 90),
      pharmacy: randomFrom(pharmacies),
      refillDate: randomDate(new Date(2025, 0, 1), new Date()),
    });
  }

  await db.collection("refills").deleteMany({});
  await db.collection("refills").insertMany(refills);

  console.log("Inserted refill records");

  console.log("Seed complete");
  process.exit();
}

seed();
