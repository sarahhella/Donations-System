import { organizationsRequestsData } from "./orgRequestsData.js";

function generateOrganizationContainers() {
  const organizationContainer = document.getElementById(
    "organizationsRequests"
  );
  const html = organizationsRequestsData
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
          <button class="navBarButton documentsButton" type="button">
            <img
              src="../../../Assets/Icons/download.png"
              alt="downloadIcon"
              width="24px"
              height="24px"
            />
            <p class="boldText">Download Document</p>
          </button>
        </a>
              <div id="buttons-${index}">
                  <button class="navBarButton buttonGreen accept-button" data-index="${index}">
                      <div class="boldText">Accept</div>
                  </button>
                  <button class="navBarButton buttonRed reject-button" data-index="${index}">
                      <div class="boldText">Reject</div>
                  </button>
                  <p id="acceptedMessage-${index}" style="display: none;">Accepted</p>
                  <p id="rejectedMessage-${index}" style="display: none;">Rejected</p>
              </div>
          </div>
      </div>
    `
    )
    .join("");
  organizationContainer.innerHTML = html;

  // Add event listeners to the accept and reject buttons
  const acceptButtons = document.querySelectorAll(".accept-button");
  const rejectButtons = document.querySelectorAll(".reject-button");

  acceptButtons.forEach((button) => {
    button.addEventListener("click", () =>
      accept(button.getAttribute("data-index"))
    );
  });

  rejectButtons.forEach((button) => {
    button.addEventListener("click", () =>
      reject(button.getAttribute("data-index"))
    );
  });
}

function accept(index) {
  // Remove the organization from the data array
  organizationsRequestsData.splice(index, 1);
  // Regenerate organization containers after removing
  generateOrganizationContainers();
}

function reject(index) {
  document.getElementById(`buttons-${index}`).style.display = "none";
  document.getElementById(`rejectedMessage-${index}`).style.display = "block";
  
}

document.addEventListener("DOMContentLoaded", generateOrganizationContainers);
