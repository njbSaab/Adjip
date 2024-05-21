function handleVideoVisibility(videoSelector, options = { root: null, rootMargin: '0px', threshold: 0.5 }) {
    const video = document.querySelector(videoSelector);
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, options);

    observer.observe(video);
}

export { handleVideoVisibility };
