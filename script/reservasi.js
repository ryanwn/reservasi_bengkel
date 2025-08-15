import { supabase } from "./supabaseClient.js";

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
      status: "pending",
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
