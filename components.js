class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="container-for-list">
          <div class="burger-menu">
            <img src="images/menu-lines.svg" alt="" />
          </div>
          <nav>
            <ul class="nav-list">
              <li><a class="nav-item" href="!#"> Acne</a></li>
              <li><a class="nav-item" href="!#">Ageing</a></li>
              <li><a class="nav-item" href="!#">Pigmentation</a></li>
              <li><a class="nav-item" href="!#">Everyday care</a></li>
              <li><a class="nav-item" href="!#">Hair loss</a></li>
              <li><a class="nav-item" href="index.html">Main</a></li> 
            </ul>
          </nav>

          <div class="container-for-button">
            <button class="button-login" type="button">Log in</button>
          </div>
        </div>
      </header>
    `;
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
                <button class="container-for-login text-login">Log in</button>
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
