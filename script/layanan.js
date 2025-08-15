import { supabase } from "./supabaseClient.js";

async function loadLayanan() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetch layanan:", error);
    return;
  }

  const serviceList = document.getElementById("services");
  const paketList = document.getElementById("packages");

  serviceList.innerHTML = "";
  paketList.innerHTML = "";

  data.forEach((item) => {
    if (item.tipe === "utama") {
      serviceList.innerHTML += `
          <li>
            <h3>${item.nama_layanan}</h3>
            <p>${item.deskripsi}</p>
            <p>Harga: ${item.harga}</p>
          </li>
        `;
    } else if (item.tipe === "paket") {
      paketList.innerHTML += `
          <div class="package">
            <h4>${item.nama_layanan}</h4>
            <p>${item.deskripsi}</p>
            <p><strong>${item.harga}</strong></p>
          </div>
        `;
    }
  });
}

loadLayanan();
