const reveals = document.querySelectorAll(".reveal");

document.addEventListener("contextmenu", (event) => {
  if (event.target.closest("img, .work, .hero, .lightbox")) event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target.closest("img")) event.preventDefault();
});

document.querySelectorAll("img").forEach((image) => {
  image.draggable = false;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach((item) => observer.observe(item));

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");

document.querySelectorAll(".work").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    const image = button.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

if (lightbox) {
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}
