class HeaderModule {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.header = document.getElementById("header");
    this.overlaySidenav = document.getElementById("offcanvas-flip");

    this.menuBtnMobile = document.querySelector(".menu-btn-mobile");
    this.closeBtn = document.querySelector(".uk-offcanvas-close");
    this.init();
  }

  init() {
    this.addScrollListener();
    this.addMenuButtonListener();
    this.addCloseButtonListener();
    this.addOverlayListener();
    this.addSideNavListener();
    this.console();
  }

  console() {
    console.log();
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  addScrollListener() {
    const throttledScroll = this.throttle(() => {
      const mainPageTop = document.querySelector(".main_page")?.offsetTop || 0;

      if (window.scrollY > this.lastScrollY) {
        this.header.style.top = "-100px";
        if (window.scrollY > 0) {
          this.header.classList.add("inverse");
        }
      } else {
        this.header.style.top = "0";
        if (window.scrollY <= mainPageTop || window.scrollY <= 100) {
          this.header.classList.remove("inverse");
        }
      }

      this.lastScrollY = window.scrollY;
    }, 100);

    window.addEventListener("scroll", throttledScroll);
  }

  addMenuButtonListener() {
    this.menuBtnMobile.addEventListener("click", () => {
      this.header.style.top = "-100%";
      this.header.classList.remove("inverse");
    });
  }

  addSideNavListener() {
    const sideNav = document.querySelector(".side-nav");
    const offcanvasBar = document.querySelector(".uk-offcanvas-bar");

    if (sideNav && offcanvasBar) {
      sideNav.addEventListener("click", (event) => {
        if (!offcanvasBar.contains(event.target)) {
          this.header.classList.add("inverse");
          this.header.style.top = "0";
          this.header.style.transition = "top .7s ease";
        }
      });
    }
  }

  addCloseButtonListener() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => {
        this.header.classList.add("inverse");
        this.header.style.top = "0";
        this.header.style.transition = "top .7s ease";
      });
    }
  }

  addOverlayListener() {
    this.overlaySidenav.addEventListener("click", () => {
      const sidenaveInParent = document.querySelector(".uk-offcanvas-bar");
      if (!sidenaveInParent) {
        this.header.classList.add("inverse");
        this.header.style.top = "0";
        this.header.style.transition = "top .7s ease";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  new HeaderModule();
});
