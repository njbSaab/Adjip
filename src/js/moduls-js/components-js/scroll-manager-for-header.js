export class ScrollManager {
    constructor(offcanvasElement, header) {
      this.offcanvasElement = offcanvasElement;
      this.offcanvas = UIkit.offcanvas(offcanvasElement);
      this.header = header
    }
  
// В файле ScrollManager.js
  handleSideNavClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    if (!href.startsWith('#')) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    let wasOpen = this.offcanvasElement.classList.contains('uk-open');
    if (wasOpen) this.offcanvas.hide();

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // Используем стрелочную функцию в setTimeout, чтобы сохранить контекст this
      setTimeout(() => {
        const scrolledY = window.scrollY || window.pageYOffset;
        const targetTop = targetElement.getBoundingClientRect().top + scrolledY;
        if (Math.abs(scrolledY - targetTop) < 10) {
          this.header.classList.add('inverse'); // Теперь this.header должен быть определен
        }
      }, 600);
    }
  }
      
  }
  
