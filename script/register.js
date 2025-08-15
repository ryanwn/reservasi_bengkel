import { supabase } from "./supabaseClient.js";

const form = document.getElementById("regisform");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const nomor_ponsel = document.getElementById("telepon").value.trim();

  if (!email || !password || !nama || !nomor_ponsel) {
    alert("Semua field wajib diisi!");
    return;
  }

  const { error } = await supabase
    .from("users")
    .insert([{ nama, email, password, nomor_ponsel, role: "user" }]);

  if (error) {
    alert("Gagal register: " + error.message);
    return;
  }

  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "../index.html";
});
