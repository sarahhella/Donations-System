import { organizationGovernorates } from "./organizationGovernorates.js";
import { organizationTypes } from "./organizationTypes.js";
import { organizationAreas } from "./organizationAreas.js";

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
                <p class="purpleText boldText"> ${organization.Area}</p>
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

  // Attach event listeners to filter checkboxes
  const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", applyFilters);
  });

  //Governorate filter
  const filterContainerGovernorate = document.querySelector('.filterContainerGovernorate');
  const html2 = organizationGovernorates.map(
    (governorate, index) => `
    <li>
    <label>
      <input type="checkbox" value=${governorate} name="governorate" />${governorate}</label>
    </li>
    `
  ).join("");
  filterContainerGovernorate.innerHTML = html2;

  //Area filter
  const filterContainerArea = document.querySelector('.filterContainerArea');
  const html4 = organizationAreas.map(
    (area, index) => `
        <li>
        <label>
          <input type="checkbox" value=${area} name="area" />${area}</label>
        </li>
        `
  ).join("");
  filterContainerArea.innerHTML = html4;

  //Type filter
  const filterContainerType = document.querySelector('.filterContainerType');
  const html3 = organizationTypes.map(
    (type, index) => `
      <li>
      <label>
        <input type="checkbox" value=${type} name="type" />${type}</label>
      </li>
      `
  ).join("");
  filterContainerType.innerHTML = html3;
});

function applyFilters() {
  const selectedGovernorates = getSelectedValues("governorate");
  const selectedAreas = getSelectedValues("area");
  const selectedTypes = getSelectedValues("type");

  const filteredOrganizations = acceptedOrganizations.filter(organization => {
    return (
      selectedGovernorates.includes(organization.governorate) &&
      selectedAreas.includes(organization.area) &&
      selectedTypes.includes(organization.type)
    );
  });

  displayOrganizations(filteredOrganizations);
}

function getSelectedValues(filterName) {
  const checkboxes = document.querySelectorAll(`input[name="${filterName}"]:checked`);
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function displayOrganizations(organizations) {
  const organizationContainer = document.getElementById("organizationsRequests");
  const html = organizations
    .map(
      organization => `
        <div class="organizationContainerSmall">
            <div>
                <p class="boldText yellowText headerText">${organization.organizationName} (${organization.organizationType})</p>
                <p class="purpleText boldText">${organization.contactNumber}</p>
                <p class="purpleText boldText">${organization.Area}</p>
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

$(".checkbox-dropdown").click(function () {
  $(this).toggleClass("is-active");
});

$(".checkbox-dropdown ul").click(function (e) {
  e.stopPropagation();
});

