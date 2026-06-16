document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Scroll fade-in for destaques and depoimentos
  const animated = document.querySelectorAll(".destaque-item, .depoimento-item");

  animated.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  function revealOnScroll() {
    animated.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
