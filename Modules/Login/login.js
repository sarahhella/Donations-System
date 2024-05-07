function validateLogin() {
    // Get username and password values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Check if username and password are correct
    if (username === "admin" && password === "admin") {
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

  function navigateToIndex(){
    //navigate back to index
    window.location.href = "../../../index.html";
  }
  