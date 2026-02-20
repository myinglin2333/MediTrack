const BASE = "http://localhost:3000/api";

export async function getMeds() {
  const res = await fetch(`${BASE}/medications`);
  return res.json();
}

export async function addMed(data) {
  const res = await fetch(`${BASE}/medications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getRefills() {
  const res = await fetch(`${BASE}/refillrecords`);
  return res.json();
}