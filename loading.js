// Initialize AOS to make the animations work
AOS.init();


document.addEventListener('DOMContentLoaded', function () {
  const loadingBar = document.getElementById('loading-bar');
  const loadingOverlay = document.getElementById('loading-overlay');
  const content = document.getElementById('content');
  const images = document.querySelectorAll('.banner-slider img');
  let loadedCount = 0;
  const totalToLoad = images.length + 1; // +1 for fetch

  // 1. Always start at 0%
  loadingBar.style.width = '0%';

  // 2. Helper to set bar width (not 100% until everything loaded)
  function updateBar() {
    const percent = Math.round((loadedCount / totalToLoad) * 100);
    loadingBar.style.width = percent + '%';
  }

  // 3. When everything is loaded, animate to 100%, then fade out
  function finishLoading() {
    // Animate bar to 100%
    loadingBar.style.width = '100%';
    // Wait for transition to finish (match your CSS: 2s)
    setTimeout(() => {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
        content.style.display = 'block';
      }, 500); // match your fade transition
    }, 2000); // match your loading bar transition (2s)
  }

  // 4. Track image loading
  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
      updateBar();
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        updateBar();
        if (loadedCount === totalToLoad) finishLoading();
      });
    }
  });

  // 5. Track data fetch
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => {
      loadedCount++;
      updateBar();
      if (loadedCount === totalToLoad) finishLoading();
    });

  // In case everything is already loaded at page load
  if (images.length === 0 || loadedCount === totalToLoad) {
    finishLoading();
  }
});