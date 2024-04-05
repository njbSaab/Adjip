import { ScrollManager } from './components-js/scroll-manager-for-header.js';

class HeaderModule {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.header = document.getElementById("header");
    this.overlaySidenav = document.getElementById("offcanvas-flip");
    this.menuBtnMobile = document.querySelector(".menu-btn-mobile");
    this.closeBtn = document.querySelector(".uk-offcanvas-close");
    this.mainPageTop = document.querySelector(".main_page")?.offsetTop || 0;
    this.sideNav = document.querySelector(".side-nav");
    this.offcanvasBar = document.querySelector(".uk-offcanvas-bar");
    this.scrollManager = new ScrollManager(this.overlaySidenav, this.header);

    this.init();
  }

  init() {
    this.addScrollListener();
    this.addMenuButtonListener();
    this.addCloseButtonListener();
    this.addOverlayListener();
    this.addSideNavListener();
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
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
      if (window.scrollY > this.lastScrollY) {
        this.header.style.top = "-100px";
        if (window.scrollY > 0) {
          setTimeout(() => {
            this.header.classList.add("inverse");
          }, 150);
        }
      } else {
        if (window.scrollY <= this.mainPageTop || window.scrollY <= 100) {
          this.header.classList.remove("inverse");
        }
        this.header.style.top = "0";
      }

      this.lastScrollY = window.scrollY;
    }, 100);

    window.addEventListener("scroll", throttledScroll);
  }

  setHeaderStyle(top, inverseAction) {
    this.header.style.top = top;
    this.header.classList[inverseAction]("inverse");
  }

  addMenuButtonListener() {
    this.menuBtnMobile.addEventListener("click", () => {
      this.setHeaderStyle("-100%", "remove");
    });
  }

  addCloseButtonListener() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => {
        this.setHeaderStyle("0", "add");
      });
    }
  }

  addOverlayListener() {
    this.overlaySidenav.addEventListener("click", (event) => {
      if (!this.offcanvasBar.contains(event.target) || event.target.classList.contains("uk-offcanvas-close")) {
        if (!event.target.closest('.uk-nav-primary') && !event.target.closest('a[href="#"]')) {
          this.setHeaderStyle("0", "add");
        }
      }
    });
  }

  addSideNavListener() {
    if (this.sideNav && this.offcanvasBar) {
      this.sideNav.addEventListener("click", (event) => {
        if (event.target.closest('.uk-parent')) {
          this.scrollManager.handleSideNavClick(event);
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HeaderModule();
});
