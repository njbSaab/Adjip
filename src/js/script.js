document.addEventListener('DOMContentLoaded', (event) => {
  let isAnimating = false;

  document.querySelectorAll('.achievement_list li').forEach(function(listItem) {
      listItem.addEventListener('mouseover', function() {
          if (isAnimating) return; 
          isAnimating = true;

          document.querySelectorAll('.achievement_images img').forEach(function(img) {
              img.classList.remove('visible');
          });

          var imageId = 'image' + this.id.replace('achievement', '');
          var imageElement = document.getElementById(imageId);
          if (imageElement) {
              imageElement.classList.add('visible');
              setTimeout(() => {
                  isAnimating = false;
              }, 800); 
          }
      });
  });
});


let lastScrollY = window.scrollY;
const header = document.getElementById('header');
const menuBtnMobile = document.querySelector('.menu-btn-mobile');

window.addEventListener('scroll', () => {
  const mainPageTop = document.querySelector('.main_page')?.offsetTop || 0; // 
  console.log(mainPageTop);

  if (window.scrollY > lastScrollY) {
    header.style.top = '-100px';
    if (window.scrollY > 200) {
      header.classList.add('inverse');
    }
  } else {
    header.style.top = '0';
    if (window.scrollY <= mainPageTop || window.scrollY <= 200) {
      header.classList.remove('inverse');
    }
  }

  lastScrollY = window.scrollY;
});

menuBtnMobile.addEventListener('click', () => {
  header.style.top = '-100%';
  header.classList.remove('inverse');
});
