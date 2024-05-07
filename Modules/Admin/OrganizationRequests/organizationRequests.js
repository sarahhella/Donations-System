import { orgRequestsData } from "./orgRequestsData.js";

let orgRequests =
  JSON.parse(localStorage.getItem("organizationsRequestsData")) ||
  orgRequestsData;
console.log("orgRequests", orgRequests);

// Function to generate organization containers
function generateOrganizationContainers() {
  const organizationContainer = document.getElementById(
    "organizationsRequests"
  );
  const html = orgRequests
    .map((organization, index) => {
      // Determine if the organization is accepted
      const isAccepted = organization.Status === "accepted";
      const isRejected = organization.Status === "rejected";

      // Set the style for button and accepted message based on the status
      const buttonStyle = isAccepted || isRejected ? "none" : "block";
      const acceptedMessageStyle = isAccepted ? "block" : "none";
      const rejectedMessageStyle = isRejected ? "block" : "none";

      return `
      <div class="organizationContainerSmall">
          <div>
              <p class="boldText yellowText headerText">${organization.organizationName} (${organization.organizationType})</p>
              <p class="purpleText boldText"> ${organization.contactNumber}</p>
              <p class="purpleText boldText">${organization.Address}</p>
          </div>
          <div class="buttonsContainer">
              <a href="../../../Assets/Files/dummyPdf.pdf" download="Organization submission">
                  <button class="navBarButton documentsButton" type="button">
                      <img src="../../../Assets/Icons/download.png" alt="downloadIcon" width="24px" height="24px"/>
                      <p class="boldText">Download Document</p>
                  </button>
              </a>
              <div id="buttons-${index}" style="display: ${buttonStyle};">
                  <button class="navBarButton buttonGreen accept-button" data-index="${index}">
                      <div class="boldText">Accept</div>
                  </button>
                  <button class="navBarButton buttonRed reject-button" data-index="${index}">
                      <div class="boldText">Reject</div>
                  </button>
              </div>
              <p id="acceptedMessage-${index}" class="boldText" style="display: ${acceptedMessageStyle}; color:#10971e; margin-right:32px;">Accepted Successfully!</p>
              <p id="rejectedMessage-${index}" class="boldText" style="display: ${rejectedMessageStyle}; color:#FF6347; margin-right:32px;">Rejected Successfully!</p>
          </div>
      </div>`;
    })
    .join("");
  organizationContainer.innerHTML = html;

  // Attach event listeners after generating HTML content
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

// Function to accept organization
function accept(index) {
  //update accepted organizations list in local storage
  const acceptedOrganization = orgRequests[index];
  acceptedOrganization.Status = "accepted";

  let acceptedOrganizations =
    JSON.parse(localStorage.getItem("acceptedOrganizations")) || [];
  acceptedOrganizations.push(acceptedOrganization);
  localStorage.setItem(
    "acceptedOrganizations",
    JSON.stringify(acceptedOrganizations)
  );

  //update organizations requests in local storage
  let orgList =
    JSON.parse(localStorage.getItem("organizationsRequestsData")) ||
    orgRequests;
  console.log("orglist accept", orgList);
  orgList[index].Status = "accepted";

  localStorage.setItem("organizationsRequestsData", JSON.stringify(orgList));

  // Hide buttons and show accepted message
  document.getElementById(`buttons-${index}`).style.display = "none";
  document.getElementById(`acceptedMessage-${index}`).style.display = "block";
}

// Function to reject organization
function reject(index) {
  //update organizations requests in local storage
  let orgList =
    JSON.parse(localStorage.getItem("organizationsRequestsData")) ||
    orgRequests;
  orgList[index].Status = "rejected";

  localStorage.setItem("organizationsRequestsData", JSON.stringify(orgList));

  // Hide buttons and show rejected message
  document.getElementById(`buttons-${index}`).style.display = "none";
  document.getElementById(`rejectedMessage-${index}`).style.display = "block";
}

// Load organization requests data and generate organization containers when page loads
document.addEventListener("DOMContentLoaded", () => {
  generateOrganizationContainers();
});
