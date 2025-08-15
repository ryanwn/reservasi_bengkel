import { supabase } from "./supabaseClient.js";

window.showAddForm = function () {
  document.getElementById("layanan-form").style.display = "block";
  document.getElementById("layanan-id").value = "";
  document.getElementById("nama-layanan").value = "";
  document.getElementById("deskripsi-layanan").value = "";
  document.getElementById("harga-layanan").value = "";
  document.getElementById("tipe-layanan").value = "";
};

async function fetchLayanan() {
  const { data, error } = await supabase.from("services").select("*");

  const tbody = document.getElementById("layanan-list");
  tbody.innerHTML = "";

  if (error) {
    console.error("Error mengambil data layanan:", error);
    return;
  }

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nama_layanan}</td>
      <td>${item.deskripsi}</td>
      <td>${item.harga}</td>
      <td>${item.tipe}</td>
      <td>
        <button class="btn btn-done" onclick="editLayanan('${item.id}')">Edit</button>
        <button class="btn btn-cancel" onclick="deleteLayanan('${item.id}')">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", fetchLayanan);

window.editLayanan = async function (id) {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    alert("Gagal mengambil data layanan: " + error.message);
    return;
  }
  document.getElementById("layanan-id").value = data.id;
  document.getElementById("nama-layanan").value = data.nama_layanan;
  document.getElementById("deskripsi-layanan").value = data.deskripsi;
  document.getElementById("harga-layanan").value = data.harga;
  document.getElementById("tipe-layanan").value = data.tipe;

  document.getElementById("layanan-form").style.display = "block";
};

window.deleteLayanan = async function (id) {
  const confirmDelete = confirm("Yakin ingin menghapus layanan ini?");
  if (!confirmDelete) return;

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    alert("Gagal menghapus layanan: " + error.message);
  } else {
    alert("Layanan berhasil dihapus.");
    fetchLayanan();
  }
};

window.cancelForm = function () {
  document.getElementById("layanan-form").style.display = "none";
};

window.handleSubmit = async function (event) {
  event.preventDefault();

  const id = document.getElementById("layanan-id").value;
  const nama_layanan = document.getElementById("nama-layanan").value;
  const deskripsi = document.getElementById("deskripsi-layanan").value;
  const harga = document.getElementById("harga-layanan").value;
  const tipe = document.getElementById("tipe-layanan").value;

  if (!nama_layanan || !deskripsi || !harga || !tipe) {
    alert("Mohon lengkapi semua field.");
    return;
  }

  if (id) {
    const { error } = await supabase
      .from("services")
      .update({
        nama_layanan,
        deskripsi,
        harga,
        tipe,
      })
      .eq("id", id);

    if (error) {
      alert("Gagal mengupdate layanan: " + error.message);
    } else {
      alert("Layanan berhasil diperbarui!");
      cancelForm();
      fetchLayanan();
    }
  } else {
    const { error } = await supabase.from("services").insert([
      {
        nama_layanan,
        deskripsi,
        harga,
        tipe,
      },
    ]);

    if (error) {
      alert("Gagal menambahkan layanan: " + error.message);
    } else {
      alert("Layanan berhasil ditambahkan!");
      cancelForm();
      fetchLayanan();
    }
  }
};
