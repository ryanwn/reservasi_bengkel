import { supabase } from "./supabaseClient.js";

const form = document.getElementById("loginform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    alert("Email dan password harus diisi!");
    return;
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("Email atau password salah!");
    return;
  }
  localStorage.setItem("email", data.email);
  localStorage.setItem("role", data.role);

  alert("Berhasil login.");
  window.location.href = "/page/home.html";
});
