import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

export async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db("meditrack");
  }
  return db;
}