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
  

  