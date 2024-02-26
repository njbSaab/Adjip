document.addEventListener("DOMContentLoaded", (event) => {
  let isAnimating = false;

  document
    .querySelectorAll(".achievement_list li")
    .forEach(function (listItem) {
      listItem.addEventListener("mouseover", function () {
        if (isAnimating) return;
        isAnimating = true;

        document
          .querySelectorAll(".achievement_images img")
          .forEach(function (img) {
            img.classList.remove("visible");
          });

        var imageId = "image" + this.id.replace("achievement", "");
        var imageElement = document.getElementById(imageId);
        if (imageElement) {
          imageElement.classList.add("visible");
          isAnimating = false;
        }
      });
      listItem.addEventListener("mouseleave", function () {
        document
          .querySelectorAll(".achievement_images img")
          .forEach(function (img) {
            img.classList.remove("visible");
          });
      });
    });
});
