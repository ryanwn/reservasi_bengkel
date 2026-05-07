import { supabase } from "./supabaseClient.js";

const ongoingBody = document.getElementById("ongoing-body");
const historyBody = document.getElementById("history-body");

async function fetchReservations() {
  const { data, error } = await supabase
    .from("reservation_logs")
    .select("*")
    .order("tanggal_reservasi", { ascending: true });

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  ongoingBody.innerHTML = "";
  historyBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.nomor_ponsel}</td>
      <td>${item.jenis_kendaraan}</td>
      <td>${item.merk_kendaraan}</td>
      <td>${item.model}</td>
      <td>${item.tahun_pembuatan}</td>
      <td>${item.jenis_layanan.replace(/-/g, " ")}</td>
      <td>${item.tanggal_reservasi}</td>
      <td>${item.waktu_reservasi}</td>
      <td class="keluhan-cell">${item.keluhan || "-"}</td>
      <td>${item.status || "pending"}</td>
      ${
        item.status === "pending"
          ? `<td>
                <button class="btn btn-edit" onclick="editReservasi('${item.id}', this)">Edit</button>
                <button 
                  class="btn btn-save"
                  onclick="saveReservasi('${item.id}', this)"
                  style="display:none;">
                    Save
                </button>
              <button class="btn btn-done" onclick="updateStatus('${item.id}', 'done')">Done</button>
              <button class="btn btn-cancel" onclick="updateStatus('${item.id}', 'cancel')">Cancel</button>
            </td>`
          : ""
      }
    `;

    if (item.status === "pending") {
      ongoingBody.appendChild(row);
    } else if (item.status === "done" || item.status === "cancel") {
      historyBody.appendChild(row);
    }
  });
}

window.updateStatus = async (id, status) => {
  const { error } = await supabase
    .from("reservation_logs")
    .update({ status })
    .eq("id", id);
  if (error) {
    alert("Gagal memperbarui status.");
    return;
  }
  fetchReservations();
};

window.showTab = function (tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  tabs.forEach((tab) => {
    tab.style.display = "none";
  });

  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(tabName).style.display = "block";

  buttons.forEach((btn) => {
    if (
      (tabName === "ongoing" && btn.textContent.includes("Aktif")) ||
      (tabName === "history" && btn.textContent.includes("Riwayat")) ||
      (tabName === "layanan" && btn.textContent.includes("Layanan"))
    ) {
      btn.classList.add("active");
    }
  });
};

window.editReservasi = function (id, button) {
  const row = button.closest("tr");

  const keluhanCell = row.querySelector(".keluhan-cell");

  const oldKeluhan = keluhanCell.innerText;

  keluhanCell.innerHTML = `
    <textarea class="edit-keluhan" rows="4" style="width:100%;">${oldKeluhan}</textarea>
  `;

  button.style.display = "none";

  const saveButton = row.querySelector(".btn-save");
  saveButton.style.display = "inline-block";
};

window.saveReservasi = async function (id, button) {
  const row = button.closest("tr");

  const textarea = row.querySelector(".edit-keluhan");

  const newKeluhan = textarea.value;

  const { error } = await supabase
    .from("reservation_logs") // ganti sesuai nama table reservasi kamu
    .update({
      keluhan: newKeluhan,
    })
    .eq("id", id);

  if (error) {
    alert("Gagal update keluhan: " + error.message);
    return;
  }

  const keluhanCell = row.querySelector(".keluhan-cell");

  keluhanCell.innerHTML = newKeluhan;

  button.style.display = "none";

  const editButton = row.querySelector(".btn-done");
  editButton.style.display = "inline-block";

  alert("Keluhan berhasil diperbarui");
};

fetchReservations();
