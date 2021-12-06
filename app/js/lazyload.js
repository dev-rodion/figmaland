"use strict";

function lazyloadInit() {
  const lazyImages = document.querySelectorAll(
    "img[data-src], source[data-srcset]"
  );
  const lazyImagesPositions = [];

  const lazyIframes = document.querySelectorAll("iframe[data-src]");
  const lazyIframesPositions = [];

  const windowHeight = document.documentElement.clientHeight;

  if (lazyImages.length > 0) {
    for (const img of lazyImages) {
      if (img.dataset.src || img.dataset.srcset) {
        let imgY = img.getBoundingClientRect().top + window.pageYOffset;
        lazyImagesPositions.push(imgY);
        lazyCheck();
      }
    }
  }

  if (lazyIframes.length > 0) {
    for (let iframe of lazyIframes) {
      if (iframe.dataset.src) {
        const iframeY = iframe.getBoundingClientRect().top + window.pageYOffset;
        lazyIframesPositions.push(iframeY);
        lazyCheck();
      }
    }
  }

  document.addEventListener("scroll", () => {
    lazyCheck();
  });

  function lazyCheck() {
    const imgIndex = lazyImagesPositions.findIndex((imgY) => {
      return window.pageYOffset > imgY - windowHeight;
    });
    if (imgIndex >= 0) {
      const img = lazyImages[imgIndex];

      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      } else if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        img.removeAttribute("data-srcset");
      }

      delete lazyImagesPositions[imgIndex];
    }

    const iframeIndex = lazyIframesPositions.findIndex((iframeY) => {
      return window.pageYOffset > iframeY - windowHeight;
    });
    if (iframeIndex >= 0) {
      const iframe = lazyIframes[iframeIndex];
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute("data-src");
      }

      delete lazyIframesPositions[iframeIndex];
    }
  }
}
