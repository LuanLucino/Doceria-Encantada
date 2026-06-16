document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Pulse effect on social buttons
  function pulseEffect(btn) {
    btn.style.transform = "scale(1.08)";
    btn.style.boxShadow = "0 0 18px rgba(200, 151, 62, 0.45)";
    setTimeout(() => {
      btn.style.transform = "";
      btn.style.boxShadow = "";
    }, 380);
  }

  document.querySelectorAll(".btn-whatsapp, .btn-instagram").forEach(btn => {
    btn.addEventListener("click", () => pulseEffect(btn));
  });

});
