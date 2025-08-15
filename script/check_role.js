const role = localStorage.getItem("role");
if (role == "admin") {
  const adminTab = document.getElementById("admin-tab");
  if (adminTab) {
    adminTab.style.display = "inline-block";
  }
}
