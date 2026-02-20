const API = "http://localhost:3000/api/medications";

const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");

let currentPage = 1;

async function loadMedications(page = 1) {
  currentPage = page;

  const res = await fetch(`${API}?page=${page}&limit=10`);
  const result = await res.json();

  const meds = result.data;
  const totalPages = result.totalPages;

  list.innerHTML = "";

  meds.forEach(m => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><strong>${m.name}</strong></td>
      <td>${m.dosage}</td>
      <td>${m.schedule}</td>
      <td>${m.notes || "-"}</td>
      <td>${m.takenAt ? new Date(m.takenAt).toLocaleDateString() : "-"}</td>

      <td>
        <span class="badge ${m.takenToday ? "badge-yes" : "badge-no"}">
          ${m.takenToday ? "Taken" : "Not taken"}
        </span>
      </td>

      <td>
        <button class="delete-btn">Delete</button>
        <button class="taken-btn">
          ${m.takenToday ? "Undo" : "Mark Taken"}
        </button>
      </td>
    `;

    row.querySelector(".delete-btn").onclick = () => deleteMed(m._id);
    row.querySelector(".taken-btn").onclick = () => markTaken(m._id, m.takenToday);

    list.appendChild(row);
  });

  renderPagination(page, totalPages);
}

function renderPagination(page, totalPages) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (page > 1) {
    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.onclick = () => loadMedications(page - 1);
    container.appendChild(prev);
  }

  const label = document.createElement("span");
  label.textContent = ` Page ${page} / ${totalPages} `;
  container.appendChild(label);

  if (page < totalPages) {
    const next = document.createElement("button");
    next.textContent = "Next";
    next.onclick = () => loadMedications(page + 1);
    container.appendChild(next);
  }
}

async function addMedication() {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      dosage: document.getElementById("dosage").value,
      schedule: document.getElementById("schedule").value,
      notes: document.getElementById("notes").value
    })
  });

  loadMedications(currentPage);
}

async function deleteMed(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadMedications(currentPage);
}

async function markTaken(id, currentStatus) {
  await fetch(`${API}/${id}/taken`, { 
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      takenToday: !currentStatus
    })
  });

  loadMedications(currentPage);
}

addBtn.addEventListener("click", addMedication);

loadMedications(1);