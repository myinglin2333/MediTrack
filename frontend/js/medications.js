const API = "/api/medications";
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const emptyMessage = document.getElementById("emptyMessage");

let editingId = null;
let currentPage = 1;

/* LOAD TABLE */

async function loadMedications(page = 1) {

  currentPage = page;

  const res = await fetch(`${API}?page=${page}&limit=10`);
  const result = await res.json();

  const meds = result.data || result;

  list.innerHTML = "";

  if (!meds.length) {
    emptyMessage.style.display = "block";
    emptyMessage.textContent = "No medications added yet.";
  } else {
    emptyMessage.style.display = "none";
  }

  meds.forEach(m => {

    const row = document.createElement("tr");

    // [Security] XSS Vulnerability: User-supplied data from the database is
    // interpolated directly into innerHTML without sanitization. If a malicious
    // value such as <script>alert('XSS')</script> is stored in m.name, m.dosage,
    // m.schedule, or m.notes, it will be executed as JavaScript when the DOM is
    // rendered. Recommendation: use textContent to set user-controlled fields,
    // or sanitize values before inserting them into innerHTML.
    row.innerHTML = `
      <td><strong>${m.name}</strong></td>
      <td>${m.dosage}</td>
      <td>${m.schedule}</td>
      <td>${m.notes || "-"}</td>

      <td>
        ${m.takenAt 
          ? new Date(m.takenAt).toLocaleDateString() 
          : "-"}
      </td>

      <td>
        <span class="badge ${m.takenToday ? "badge-yes" : "badge-no"}">
          ${m.takenToday ? "Taken" : "Not taken"}
        </span>
      </td>

      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <button class="taken-btn">
          ${m.takenToday ? "Undo" : "Mark Taken"}
        </button>
      </td>
    `;

    row.querySelector(".delete-btn").onclick = () => deleteMed(m._id);
    row.querySelector(".taken-btn").onclick = () => markTaken(m._id, m.takenToday);
    row.querySelector(".edit-btn").onclick = () => startEdit(m);

    list.appendChild(row);
  });

  renderPagination(result.page || 1, result.totalPages || 1);
}






/* PAGINATION UI */

function renderPagination(page, totalPages) {

  const container = document.getElementById("pagination");
  if (!container) return;

  container.innerHTML = "";

  if (page > 1) {
    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.onclick = () => loadMedications(page - 1);
    container.appendChild(prev);
  }

  const label = document.createElement("span");
  label.textContent = ` Page ${page} / ${totalPages} `;
  label.style.margin = "0 10px";
  container.appendChild(label);

  if (page < totalPages) {
    const next = document.createElement("button");
    next.textContent = "Next";
    next.onclick = () => loadMedications(page + 1);
    container.appendChild(next);
  }
}

/* ADD OR UPDATE */

async function addMedication() {

  const data = {
    name: document.getElementById("name").value,
    dosage: document.getElementById("dosage").value,
    schedule: document.getElementById("schedule").value,
    notes: document.getElementById("notes").value
  };

  if (!data.name) {
    alert("Medication name is required");
    return;
  }

  if (editingId) {

    await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    editingId = null;
    addBtn.textContent = "Add";
    cancelBtn.style.display = "none";
    formTitle.textContent = "Add Medication";

  } else {

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  clearForm();
  await loadMedications(currentPage);
}

/* START EDIT */

function startEdit(med) {

  editingId = med._id;

  document.getElementById("name").value = med.name;
  document.getElementById("dosage").value = med.dosage;
  document.getElementById("schedule").value = med.schedule;
  document.getElementById("notes").value = med.notes || "";

  addBtn.textContent = "Update";
  cancelBtn.style.display = "inline-block";
  formTitle.textContent = "Edit Medication";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* CANCEL EDIT */

cancelBtn.onclick = () => {
  editingId = null;
  clearForm();
  addBtn.textContent = "Add";
  cancelBtn.style.display = "none";
  formTitle.textContent = "Add Medication";
};

/* DELETE */

async function deleteMed(id) {

  if (!confirm("Delete this medication?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });

  await loadMedications(currentPage);
}

/* TOGGLE TAKEN */

async function markTaken(id, currentStatus) {
  await fetch(`${API}/${id}/taken`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      takenToday: !currentStatus,
    }),
  });

  await loadMedications(currentPage);
}

/* CLEAR FORM */

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("dosage").value = "";
  document.getElementById("schedule").value = "";
  document.getElementById("notes").value = "";
}

/* INIT*/

addBtn.addEventListener("click", addMedication);

loadMedications();
