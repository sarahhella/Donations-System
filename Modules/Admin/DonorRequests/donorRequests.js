import { donors } from "./donorRequestsData.js";

let donRequests =
  JSON.parse(localStorage.getItem("DonorsRequestsData")) ||
  donors;
console.log("donRequests", donRequests);

function generateDonorContainers() {
  const organizationContainer = document.getElementById(
    "donorRequests"
  );
  const html = donRequests
    .map(
      (donor, index) => {
        // Determine if the donor is accepted
        const isAccepted = donor.Status === "accepted";
        const isRejected = donor.Status === "rejected";

        // Set the style for button and accepted message based on the status
        const buttonStyle = isAccepted || isRejected ? "none" : "block";
        const acceptedMessageStyle = isAccepted ? "block" : "none";
        const rejectedMessageStyle = isRejected ? "block" : "none";

        return `
        <div class="organizationContainerSmall">
            <div>
                <p class="boldText yellowText headerText">${donor.name} (${donor.department})</p>
                <p class="purpleText boldText"> ${donor.phoneNumber}</p>
                <p class="purpleText boldText"> ${donor.email}</p>
                <p class="purpleText boldText">${donor.clinic_location}</p>
            </div>
            <div class="buttonsContainer">
            <a
            href="../../../Assets/Files/dummyPdf.pdf"
            download="Donor submission"
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
        </div>
      `
      })
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
  //update donors requests in local storage
  let donorsList =
    JSON.parse(localStorage.getItem("DonorsRequestsData")) ||
    donRequests;
  console.log("donorsList accept", donorsList);
  donorsList[index].Status = "accepted";

  localStorage.setItem("DonorsRequestsData", JSON.stringify(donorsList));

  // Hide buttons and show accepted message
  document.getElementById(`buttons-${index}`).style.display = "none";
  document.getElementById(`acceptedMessage-${index}`).style.display = "block";
}

function reject(index) {
  //update donors requests in local storage
  let donorsList =
    JSON.parse(localStorage.getItem("DonorsRequestsData")) ||
    donRequests;
  console.log("donorsList accept", donorsList);
  donorsList[index].Status = "rejected";

  localStorage.setItem("DonorsRequestsData", JSON.stringify(donorsList));

  // Hide buttons and show accepted message
  document.getElementById(`buttons-${index}`).style.display = "none";
  document.getElementById(`rejectedMessage-${index}`).style.display = "block";

}

document.addEventListener("DOMContentLoaded", generateDonorContainers);