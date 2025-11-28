// Theme Toggle
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }
}

// navigation
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("data-section");
    scrollToSection(targetId);

    // Update active state
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.id === "skills") {
        const skillBars = entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.style.width;
          }, index * 100);
        });
      }

// update active nav link
navLinks.forEach((link) => {
        if (link.getAttribute("data-section") === entry.target.id) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});