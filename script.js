document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Adjust the offset as needed

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("portfolio-modal");
  const modalBox = document.getElementById("modal-box");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalContentContainer = document.getElementById(
    "modal-content-container"
  );
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  const showModal = () => {
    modal.classList.remove("invisible");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      modalBox.classList.remove("scale-95");
    }, 20);
  };

  const hideModal = () => {
    modal.classList.add("opacity-0");
    modalBox.classList.add("scale-95");
    setTimeout(() => {
      modal.classList.add("invisible");
      modalContentContainer.innerHTML = "";
    }, 300);
  };

  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
      const projectId = item.dataset.projectId;
      const projectData = portfolioData.find((p) => p.id === projectId);

      if (!projectData) return;

      let modalHTML = "";

      if (projectData.gallery && projectData.gallery.length > 0) {
        const swiperSlidesHTML = projectData.gallery
          .map(
            (imgSrc) => `
                    <div class="swiper-slide"><img src="${imgSrc}" loading="lazy" class="w-full h-full object-contain"></div>`
          )
          .join("");
        modalHTML = `
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="md:w-1/2">
                            <div id="project-slider" class="swiper w-full h-80 bg-gray-200 rounded-lg">
                                <div class="swiper-wrapper">${swiperSlidesHTML}</div>
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                        <div class="md:w-1/2">
                            <h3 class="text-3xl font-bold mb-3">${projectData.title}</h3><hr class="my-3"><p class="text-gray-700">${projectData.description}</p>
                        </div>
                    </div>`;
        modalContentContainer.innerHTML = modalHTML;
        new Swiper("#project-slider", {
          loop: true,
          grabCursor: true,
          pagination: { el: ".swiper-pagination", clickable: true },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      } else {
        modalHTML = `
                    <div class="w-full">
                        <h3 class="text-3xl font-bold mb-3">${projectData.title}</h3><hr class="my-3"><p class="text-gray-700">${projectData.description}</p>
                    </div>`;
        modalContentContainer.innerHTML = modalHTML;
      }
      showModal();
    });
  });

  closeModalBtn.addEventListener("click", hideModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("invisible"))
      hideModal();
  });
});
