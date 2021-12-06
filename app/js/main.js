window.onload = function () {
  const body = document.querySelector("body");
  const header = document.querySelector("#header");
  const smoothLinks = document.querySelectorAll("a[href^='#']");
  const videoPlayerBtns = document.querySelectorAll(".video_player__btn");
  const forms = document.querySelectorAll("form");
  const showMoreBtns = document.querySelectorAll("button[data-block-id]");

  // Works with scrolling and the header
  document.addEventListener("scroll", () => {
    handleScroll();
  });

  // Works with the smooth Links
  for (const link of smoothLinks) {
    handleSmoothLinkClick(link);
  }

  // Works with the Video Player Buttons and Popups
  for (const btn of videoPlayerBtns) {
    const videoPlayer = btn.closest(".video_player");
    const popup = videoPlayer.querySelector(".popup");

    btn.addEventListener("click", () => {
      showPopup(popup);
    });

    popup.addEventListener("click", () => {
      hidePopup(popup);
    });
  }

  // Blocks all the Form
  for (const form of forms) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  // Works with Button that can show more content
  for (const btn of showMoreBtns) {
    const btnText = btn.innerHTML;
    const id = btn.getAttribute("data-block-id");
    const hiddenBlock = document.querySelector(id);
    const contentHeight = hiddenBlock.querySelector("div").clientHeight;

    btn.addEventListener("click", () => {
      if (!hiddenBlock.style.height) {
        hiddenBlock.style.height = `${contentHeight}px`;
        btn.innerHTML = "Hide";
      } else {
        hiddenBlock.style.height = "";
        btn.innerHTML = btnText;
    }
    });
  }

  /* === Function === */

  // Handles Scroll
  function handleScroll() {
    if (window.pageYOffset > 0) {
      header.classList.add("header_sticky");
    } else {
      header.classList.remove("header_sticky");
    }
  }
  handleScroll();
  // ============

  // Handle Smooth Links Click
  function handleSmoothLinkClick(smoothLink) {
    // Handle click
    smoothLink.addEventListener("click", (e) => {
      e.preventDefault();

      const yOffset = 0;
      const id = smoothLink.getAttribute("href");
      const element = document.querySelector(id);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }
  // ============

  // Handle Popup
  function showPopup(popup) {
    popup.classList.add("popup_active");
    body.style.overflow = "hidden";
    setTimeout(() => {
      lazyload.check();
    }, 1000);
  }
  function hidePopup(popup) {
    popup.classList.remove("popup_active");
    body.style.overflow = "";
  }
  // ============

  // Init Lazyloading
  lazyloadInit();
};
