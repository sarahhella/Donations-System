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
});

// function search_animal() {
//   let input = document.getElementById("searchbar").value;
//   input = input.toLowerCase();
//   let x = document.getElementsByClassName("animals");

//   for (i = 0; i < x.length; i++) {
//     if (!x[i].innerHTML.toLowerCase().includes(input)) {
//       x[i].style.display = "none";
//     } else {
//       x[i].style.display = "list-item";
//     }
//   }
// }
