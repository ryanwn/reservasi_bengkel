import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.5/+esm";

const supabaseUrl = "https://nimxynqhngpeelredtpu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbXh5bnFobmdwZWVscmVkdHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjYwNDYsImV4cCI6MjA2OTA0MjA0Nn0.QyatEMQhc3Znkj0xEiVyx9DeLFzGQ3dbl5P_73mn1qg";
const supabase = createClient(supabaseUrl, supabaseKey);

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
    .insert([{ nama, email, password, nomor_ponsel }]);

  if (error) {
    alert("Gagal register: " + error.message);
    return;
  }

  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "../index.html";
});
