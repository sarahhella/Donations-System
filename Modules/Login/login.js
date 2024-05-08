let username = "admin";
let password = localStorage.getItem("password");

// If no password is stored, set the default password
if (!password) {
  password = "admin";
  // Store the default password in local storage
  localStorage.setItem("password", password);
}

console.log("the password is:", password);

function validateLogin() {
  // Get username and password values
  var inputUsername = document.getElementById("username").value;
  var inputPassword = document.getElementById("password").value;

  // Check if username and password are correct
  if (inputUsername === username && inputPassword === password) {
    // Get the role from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var role = urlParams.get('role');
    console.log("role:", role);

    // Redirect user based on role
    if (role === "Admin") {
      window.location.href = "../Admin/HomePage/homePage.html"; // Redirect to admin page
    } else {
      // Redirect to other pages based on different roles
    }

    // Prevent form submission
    return false;
  } else {
    // Display error message or perform other actions
    alert("Incorrect username or password!");
    return false;
  }
}
