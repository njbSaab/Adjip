document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.achievement_list li').forEach(function(listItem) {
      listItem.addEventListener('mouseover', function() {
        // Hide all images first by removing the 'visible' class
        document.querySelectorAll('.achievement_images img').forEach(function(img) {
          img.classList.remove('visible');
        });
        
        // Show the corresponding image by adding the 'visible' class
        var imageId = 'image' + this.id.replace('achievement', '');
        var imageElement = document.getElementById(imageId);
        if (imageElement) {
          imageElement.classList.add('visible');
        }
      });
    
      listItem.addEventListener('mouseout', function() {
        // Hide the image again by removing the 'visible' class
        var imageId = 'image' + this.id.replace('achievement', '');
        var imageElement = document.getElementById(imageId);
        if (imageElement) {
          imageElement.classList.remove('visible');
        }
      });
    });
  });
  
//хедер
let lastScrollY = window.scrollY;
const header = document.getElementById('header');
const menuBtnMobile = document.querySelector('.menu-btn-mobile'); // Находим кнопку по классу

// Добавляем обработчик события на прокрутку
window.addEventListener('scroll', () => {
  if (lastScrollY < window.scrollY) {
    header.style.top = '-100px';
    header.classList.add('inverse');
  } else {
    header.style.top = '0';
  }

  lastScrollY = window.scrollY;
});

// Добавляем обработчик события на клик по кнопке
menuBtnMobile.addEventListener('click', () => {
  header.style.top = '-100%'; // Полное скрытие хедера
  // Опционально: можно убрать класс 'inverse', если он мешает визуальному стилю при скрытом хедере
  header.classList.remove('inverse');
});
