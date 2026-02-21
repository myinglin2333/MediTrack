import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "meditrack";

let client = null;
let db = null;

export async function connectDatabase() {
  if (db) return db;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error("Database not connected. Call connectDatabase() first.");
  }
  return db;
}

export function getCollection(name) {
  return getDatabase().collection(name);
}

export function getDb() {
  return getDatabase();
}
