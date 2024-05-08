import { organizationGovernorates } from "./organizationGovernorates";

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

  const dropdownButton = document.getElementsByClassName("dropbtn");
  dropdownButton.addEventListener("onclick", toggleDropdown);

  //filter
  // Populate the dropdown with governorates
  const governoratesList = document.getElementById("governorates-list");

  organizationGovernorates.forEach((governorate) => {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = governorate;
    checkbox.id = governorate.toLowerCase(); // Use lowercase governorate name as id

    const label = document.createElement("label");
    label.setAttribute("for", governorate.toLowerCase());
    label.textContent = governorate;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    governoratesList.appendChild(checkboxContainer);
  });
});

function search() {
  let input = document.getElementById("searchbar").value.toLowerCase(); // Get the input value and convert to lowercase
  console.log("search input", input);
  const acceptedOrganizations =
    JSON.parse(localStorage.getItem("acceptedOrganizations")) || [];
  const organizationContainer = document.getElementById(
    "organizationsRequests"
  );

  const filteredOrganizations = acceptedOrganizations.filter((organization) => {
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

function toggleDropdown() {
  const dropdownContent = document.getElementById("governorates-list");
  dropdownContent.classList.toggle("show");
}
