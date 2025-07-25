import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.5/+esm";

const supabaseUrl = "https://nimxynqhngpeelredtpu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbXh5bnFobmdwZWVscmVkdHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjYwNDYsImV4cCI6MjA2OTA0MjA0Nn0.QyatEMQhc3Znkj0xEiVyx9DeLFzGQ3dbl5P_73mn1qg";
const supabase = createClient(supabaseUrl, supabaseKey);

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

  alert("Berhasil login.");
  window.location.href = "/page/home.html";
});
