class SiteHeader extends HTMLElement {
  connectedCallback() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let authSection = `<button class="button-login" id="login-nav-btn">Log in</button>`;
    let adminLink = "";
    if (currentUser) {
      authSection = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.9rem; font-weight: 500; color: #333;">@${currentUser.username}</span>
          <button class="button-login" id="logout-btn" style="width: auto; padding: 0 12px;">Exit</button>
        </div>
      `;
      if (currentUser.role === "admin") {
        adminLink = `<li><a class="nav-item" href="admin.html" style="color: palevioletred; font-weight: bold;">Admin</a></li>`;
      }
    }

    this.innerHTML = `
      <header>
        <div class="container-for-list">
          <div class="burger-menu">
            <img src="images/menu-lines.svg" alt="" />
          </div>
          <nav>
            <ul class="nav-list">
              <li><a class="nav-item" href="index.html">Main</a></li>
               <li><a class="nav-item" href="catalog.html">Catalog</a></li>
               <li><a class="nav-item" href="cart.html">Cart</a></li> 
                <li><a class="nav-item" href="favorites.html">Favorites</a></li> 
                 <li><a class="nav-item" href="feedback.html">Leave Review</a></li> 
              ${adminLink}
            </ul>
          </nav>

          <div class="container-for-button">
             ${authSection}
          </div>
        </div>
      </header>
    `;
    const logoutBtn = this.querySelector("#logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.href = "index.html";
      });
    }

    const loginNavBtn = this.querySelector("#login-nav-btn");
    if (loginNavBtn) {
      loginNavBtn.addEventListener("click", () => {
        location.href = "auth.html";
      });
    }
  }
}

customElements.define("site-header", SiteHeader);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="container-for-footer">
          <div class="container-for-info">
            <nav>
              <ul class="container-for-skinhair">
                <li class="item-skinhair">Ageing</li>
                <li class="item-skinhair">Acne</li>
                <li class="item-skinhair">Pigmentation</li>
                <li class="item-skinhair">Hair Loss</li>
                <li class="item-skinhair">Software Essentials</li>
                <li class="item-skinhair">Advanced Ageing Set</li>
                <li class="item-skinhair">Acne Kit</li>
              </ul>
            </nav>
            <nav>
              <ul class="container-for-exsessinf">
                <li class="item-skinhair">Ingredients</li>
                <li class="item-skinhair">Skin Journal</li>
                <li class="item-skinhair">Support Centre</li>
                <li class="item-skinhair">Contact Us</li>
              </ul>
            </nav>
          </div>

          <div class="container-for-images">
            <picture>
              <source media="(max-width:321px)" srcset="images/soft1.png" />
              <img class="soft" src="images/logotype.png" alt="" />
            </picture>
            <picture>
              <source media="(max-width:321px)" srcset="images/flags2.png" />
              <img class="flag" src="images/flags.png" alt="" />
            </picture>
            <div class="empty"></div>
          </div>

          <nav class="container-for-navigation">
            <div class="empty"></div>
            <ul class="navigation">
              <li class="terms1">Privacy Policy</li>
              <li class="terms2">|</li>
              <li class="terms3">Terms & Conditions</li>
              <li class="terms4">|</li>
              <li class="terms5">Fulfilment, Shipping & Returns Policy</li>
            </ul>
            <div class="empty1"></div>
          </nav>
        </div>
      </footer>
    `;
  }
}
customElements.define("site-footer", SiteFooter);
