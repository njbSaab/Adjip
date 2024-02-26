document.addEventListener("DOMContentLoaded", function () {
  var progressBar = document.createElement("div");
  progressBar.classList.add("more-than-distr-progress-bar");
  document
    .querySelector("#more-than-distr-slider")
    .parentNode.insertBefore(
      progressBar,
      document.querySelector("#more-than-distr-slider"),
    );

  var main = new Splide("#more-than-distr-slider", {
    type: "fade",
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    cover: true,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    pauseOnFocus: false,
    rewind: true,
  }).mount();

  var thumbnails = new Splide("#more-than-distr-thumbnail-slider", {
    rewind: true,
    fixedWidth: 104,
    fixedHeight: 58,
    isNavigation: true,
    gap: 10,
    focus: "center",
    pagination: false,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      640: {
        fixedWidth: 66,
        fixedHeight: 38,
      },
    },
  }).mount();

  main.sync(thumbnails);

  // Listen for autoplay update
  main.on("autoplay:playing", function (rate) {
    progressBar.style.width = rate * 100 + "%";
  });
});
