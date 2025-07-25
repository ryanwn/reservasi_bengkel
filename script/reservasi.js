import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.5/+esm";

const supabaseUrl = "https://nimxynqhngpeelredtpu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbXh5bnFobmdwZWVscmVkdHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjYwNDYsImV4cCI6MjA2OTA0MjA0Nn0.QyatEMQhc3Znkj0xEiVyx9DeLFzGQ3dbl5P_73mn1qg";
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("reservationform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const nomor_ponsel = document.getElementById("telepon").value.trim();
  const jenis_kendaraan = document.getElementById("kendaraan").value;
  const merk_kendaraan = document.getElementById("merk").value.trim();
  const model = document.getElementById("model").value.trim();
  const tahun_pembuatan = document.getElementById("tahun").value;
  const jenis_layanan = document.getElementById("layanan").value;
  const tanggal_reservasi = document.getElementById("tanggal").value;
  const waktu_reservasi = document.getElementById("waktu").value;
  const keluhan = document.getElementById("keluhan").value.trim();

  const { data, error } = await supabase.from("reservation_logs").insert([
    {
      nama,
      email,
      nomor_ponsel,
      jenis_kendaraan,
      merk_kendaraan,
      model,
      tahun_pembuatan,
      jenis_layanan,
      tanggal_reservasi,
      waktu_reservasi,
      keluhan,
    },
  ]);

  if (error) {
    console.error("Gagal menyimpan data:", error.message);
    alert("Reservasi gagal dikirim. Silakan coba lagi.");
  } else {
    alert("Reservasi berhasil dibuat!");
    form.reset();
  }
});
