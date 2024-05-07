document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("nextBtn");

    nextBtn.addEventListener("click", function() {
      const selectedRole = document.getElementById("roles").value;
      window.location.href = "./Modules/Login/login.html?role=" + encodeURIComponent(selectedRole);
    });
  });
  