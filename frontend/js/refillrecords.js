const API = "http://localhost:3000/api/refillrecords";

const list = document.getElementById("list");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

let currentPage = 1;
let editingId = null;

async function loadRefills(page = 1) {
    currentPage = page;

    try {
        const res = await fetch(`${API}?page=${page}&limit=10`);
        const result = await res.json();

        const refills = result.data;
        const totalPages = result.totalPages;

        list.innerHTML = "";

        refills.forEach(r => {
            const row = document.createElement("tr");

            row.innerHTML = `
        <td><strong>${r.medicationName}</strong></td>
        <td>${r.refillDate}</td>
        <td>${r.quantity}</td>
        <td>${r.pharmacy}</td>
        <td>${r.notes || "-"}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;

            row.querySelector(".edit-btn").onclick = () => startEdit(r);
            row.querySelector(".delete-btn").onclick = () => deleteRefill(r._id);

            list.appendChild(row);
        });

        renderPagination(page, totalPages);
    } catch (err) {
        console.error("Error loading refills:", err);
    }
}

function renderPagination(page, totalPages) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    if (totalPages <= 1) return;

    if (page > 1) {
        const prev = document.createElement("button");
        prev.textContent = "Prev";
        prev.onclick = () => loadRefills(page - 1);
        container.appendChild(prev);
    }

    const label = document.createElement("span");
    label.textContent = ` Page ${page} / ${totalPages} `;
    container.appendChild(label);

    if (page < totalPages) {
        const next = document.createElement("button");
        next.textContent = "Next";
        next.onclick = () => loadRefills(page + 1);
        container.appendChild(next);
    }
}

async function saveRefill() {
    const data = {
        name: document.getElementById("name").value,
        refillDate: document.getElementById("refillDate").value,
        quantity: document.getElementById("quantity").value,
        pharmacy: document.getElementById("pharmacy").value,
        notes: document.getElementById("notes").value
    };

    if (!data.name || !data.refillDate) {
        alert("Please enter at least the medication name and refill date.");
        return;
    }

    const method = editingId ? "PATCH" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    try {
        await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        resetForm();
        loadRefills(currentPage);
    } catch (err) {
        console.error("Error saving refill:", err);
    }
}

function startEdit(refill) {
    editingId = refill._id;
    document.getElementById("name").value = refill.name;
    document.getElementById("refillDate").value = refill.refillDate;
    document.getElementById("quantity").value = refill.quantity;
    document.getElementById("pharmacy").value = refill.pharmacy;
    document.getElementById("notes").value = refill.notes || "";

    formTitle.textContent = "Edit Refill Record";
    saveBtn.textContent = "Update";
    cancelBtn.style.display = "inline-block";
}

function resetForm() {
    editingId = null;
    document.getElementById("name").value = "";
    document.getElementById("refillDate").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("pharmacy").value = "";
    document.getElementById("notes").value = "";

    formTitle.textContent = "Add Refill Record";
    saveBtn.textContent = "Add";
    cancelBtn.style.display = "none";
}

async function deleteRefill(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            loadRefills(currentPage);
        } catch (err) {
            console.error("Error deleting refill:", err);
        }
    }
}

saveBtn.addEventListener("click", saveRefill);
cancelBtn.addEventListener("click", resetForm);

loadRefills(1);
