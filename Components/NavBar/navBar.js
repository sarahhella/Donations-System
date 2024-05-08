class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
      <div class="navBarContainer navBorder">
        <img
          src="../../../Assets/Images/LogoBig.jpg"
          alt="Hope Logo"
          width="180"
          height="60"
        />
        <div class="navBarContainer navBarContainer2">
          <div class="buttonsDiv">
            <button onClick="registeredOrg()" class="navBarButton">
            <div class="boldText">Registered Organizations</div>
            </button>
            <button onClick="changePass()"  class="navBarButton">
            <div class="boldText">Change Password</div>
            </button>
          </div>
            <button onCLick= "logOutIcon()" class="iconButton">
              <img
                src="../../../Assets/Icons/logout.png"
                alt="logOutIcon"
                width="22px"
                height="22px"
              />
            </button>
        </div>
      </div>
    </nav>

      `;
  }
}
customElements.define("main-header", Header);

function logOutIcon() {
  window.location.href = "../../../index.html";
  // localStorage.clear();
}

function changePass() {
  window.location.href = "../PasswordManagement/passwordManage.html";
}

function registeredOrg() {
  window.location.href =
    "../RegisteredOrganizations/registeredOrganizations.html";
}
