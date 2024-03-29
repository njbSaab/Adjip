class HeaderModule {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.header = document.getElementById("header");
    this.overlaySidenav = document.getElementById("offcanvas-flip");
    this.menuBtnMobile = document.querySelector(".menu-btn-mobile");
    this.closeBtn = document.querySelector(".uk-offcanvas-close");
    this.mainPageTop = document.querySelector(".main_page")?.offsetTop || 0;
    this.offcanvas = UIkit.offcanvas(this.overlaySidenav);
    this.sideNav = document.querySelector(".side-nav");
    this.offcanvasBar = document.querySelector(".uk-offcanvas-bar");
    this.init();
  }

  init() {
    this.addScrollListener();
    this.addMenuButtonListener();
    this.addCloseButtonListener();
    this.addOverlayListener();
    this.addSideNavListener();
    this.addMenuButtonHoverListener();
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
      if (window.scrollY > this.lastScrollY) {
        this.header.style.top = "-100px"; // Сначала изменяем позицию
        if (window.scrollY > 0) {
          setTimeout(() => { // Добавляем задержку перед добавлением класса 'inverse'
            this.header.classList.add("inverse");
          }, 150); // Задержка должна быть больше, чем время анимации скрытия заголовка
        }
      } else {
        if (window.scrollY <= this.mainPageTop || window.scrollY <= 100) {
          this.header.classList.remove("inverse"); // Удаляем класс 'inverse' сразу
        }
        this.header.style.top = "0"; // Затем изменяем позицию
      }
  
      this.lastScrollY = window.scrollY;
    }, 100);
  
    window.addEventListener("scroll", throttledScroll);
  }
  

  setHeaderStyle(top, inverseAction) {
    this.header.style.top = top;
    this.header.classList[inverseAction]("inverse");
  }

  addMenuButtonHoverListener() {
    this.menuBtnMobile.addEventListener('mouseenter', () => {
      this.offcanvas.show();
      this.setHeaderStyle("-100%", "remove");
    });
  }

  addMenuButtonListener() {
    this.menuBtnMobile.addEventListener("click", () => {
      this.setHeaderStyle("-100%", "remove");
    });
  }

  addSideNavListener() {
    if (this.sideNav && this.offcanvasBar) {
      this.sideNav.addEventListener("click", (event) => {
        if (!this.offcanvasBar.contains(event.target)) {
          this.setHeaderStyle("0", "add");
        }
      });
    }
  }

  addCloseButtonListener() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => {
        this.setHeaderStyle("0", "add");
      });
    }
  }

  addOverlayListener() {
    this.overlaySidenav.addEventListener("click", () => {
      if (!document.querySelector(".uk-offcanvas-bar")) {
        this.setHeaderStyle("0", "add");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HeaderModule();
});
