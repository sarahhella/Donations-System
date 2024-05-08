document.addEventListener("DOMContentLoaded", function () {
  const acceptedOrganizations =
    JSON.parse(localStorage.getItem("acceptedOrganizations")) || [];

  console.log("Registered Organizations:", acceptedOrganizations);

  const organizationContainer = document.getElementById(
    "organizationsRequests"
  );
  const html = acceptedOrganizations
    .map(
      (organization, index) => `
        <div class="organizationContainerSmall">
            <div>
                <p class="boldText yellowText headerText">${organization.organizationName} (${organization.organizationType})</p>
                <p class="purpleText boldText"> ${organization.contactNumber}</p>
                <p class="purpleText boldText">${organization.Address}</p>
            </div>
            <div class="buttonsContainer">
            <a
            href="../../../Assets/Files/dummyPdf.pdf"
            download="Organization submission"
          >
          </a>
            </div>
        </div>
      `
    )
    .join("");
  organizationContainer.innerHTML = html;

  // Attach event listener to search bar input
  const searchBar = document.getElementById("searchbar");
  searchBar.addEventListener("keyup", search);
});

function search() {
  let input = document.getElementById("searchbar").value.toLowerCase(); // Get the input value and convert to lowercase
  console.log('search input', input);
  const acceptedOrganizations = JSON.parse(localStorage.getItem("acceptedOrganizations")) || [];
  const organizationContainer = document.getElementById("organizationsRequests");

  const filteredOrganizations = acceptedOrganizations.filter(organization => {
    return organization.organizationName.toLowerCase().includes(input); // Check if organization name includes the input value
  });

  const html = filteredOrganizations
    .map(
      (organization, index) => `
        <div class="organizationContainerSmall">
            <div>
                <p class="boldText yellowText headerText">${organization.organizationName} (${organization.organizationType})</p>
                <p class="purpleText boldText">${organization.contactNumber}</p>
                <p class="purpleText boldText">${organization.Address}</p>
            </div>
            <div class="buttonsContainer">
              <a href="../../../Assets/Files/dummyPdf.pdf" download="Organization submission"></a>
            </div>
        </div>
      `
    )
    .join("");

  organizationContainer.innerHTML = html;
}

