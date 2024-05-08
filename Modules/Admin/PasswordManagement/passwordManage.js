function changePassword() {
    // Get input values
    var previousPassword = localStorage.getItem("password");
    console.log('previous pass:', previousPassword);
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword = document.getElementById("confirmNewPassword").value;

    // Validate password fields
    if (previousPassword !== document.getElementById("previousPassword").value) {
        alert("Incorrect previous password. Please try again.");
        document.getElementById("passwordForm").reset();
        return false;
    }

    if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match. Please try again.");
        document.getElementById("passwordForm").reset();
        return false;
    }

    // If validation passes, update the stored password
    localStorage.setItem("password", newPassword);
    console.log('password changed to:', newPassword)

    // Display success message and allow form submission
    alert("Password changed successfully!");
    return true; // Allow form submission
}

// Function to navigate back to the index page
function navigateToIndex() {
    window.location.href = "../../../index.html";
  }

