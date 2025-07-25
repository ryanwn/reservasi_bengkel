document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user_id");
      localStorage.removeItem("email");

      alert("Anda telah logout.");
      window.location.href = "../index.html";
    });
  }
});
