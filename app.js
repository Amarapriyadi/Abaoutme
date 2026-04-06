// ========== DARK / LIGHT MODE TOGGLE ==========
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme on load
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
} else if (currentTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
}

// Toggle theme function
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    showToast("Light Mode Aktif 🌞");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    showToast("Dark Mode Aktif 🌙");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, duration = 2000) {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 40px;
        font-size: 0.9rem;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Add animation keyframes
const toastStyles = document.createElement("style");
toastStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
    }
`;
document.head.appendChild(toastStyles);

// ========== ANIMASI FADE IN PADA SCROLL (Intersection Observer) ==========
const fadeElements = document.querySelectorAll(
  ".exp-card, .skills-category, .about-grid, .contact-grid, .hero-info, .hero-photo",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

fadeElements.forEach((el) => {
  el.style.opacity = "0";
  observer.observe(el);
});

// ========== ANIMASI TYPING UNTUK TITLE ==========
const titleElement = document.querySelector(".title");
if (titleElement) {
  const originalText = titleElement.textContent;
  titleElement.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < originalText.length) {
      titleElement.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  // Start typing when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeWriter();
        heroObserver.unobserve(entry.target);
      }
    });
  });
  heroObserver.observe(titleElement);
}

// ========== ANIMASI FLOATING PADA PHOTO FRAME ==========
const photoFrame = document.querySelector(".photo-frame");
if (photoFrame) {
  photoFrame.style.animation = "float 4s ease-in-out infinite";
}

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Animate hamburger icon
    const icon = menuToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = menuToggle?.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Update URL without jumping
      history.pushState(null, null, this.getAttribute("href"));
    }
  });
});

// ========== SKILL BAR ANIMATION ON SCROLL ==========
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillsSection = document.querySelector("#skills");

  if (!skillsSection) return;

  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight;

  if (sectionPosition < screenPosition) {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    });
    window.removeEventListener("scroll", animateSkillBars);
  }
}

window.addEventListener("scroll", animateSkillBars);
setTimeout(animateSkillBars, 500);

// ========== ACTIVE NAVIGATION ON SCROLL ==========
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Add active style to CSS
const activeStyle = document.createElement("style");
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary);
        font-weight: 600;
        position: relative;
    }
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary);
        border-radius: 2px;
    }
`;
document.head.appendChild(activeStyle);

// ========== DOWNLOAD CV FUNCTION ==========
// CARA: Taruh file CV PDF Anda di folder utama (root) dengan nama "CV_Amar.pdf"
// Atau ganti nama file sesuai keinginan di bawah ini

const downloadBtn = document.querySelector(".btn-outline");
if (downloadBtn && downloadBtn.textContent.includes("Download CV")) {
  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Nama file CV Anda - GANTI SESUAI NAMA FILE ANDA
    const cvFileName = "CV_Amar_Apriyadi.pdf";

    // Cek apakah file ada dengan fetch
    fetch(cvFileName, { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          // File ditemukan, download
          const link = document.createElement("a");
          link.href = cvFileName;
          link.download = cvFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showToast("Download CV dimulai... 📄");
        } else {
          // File tidak ditemukan
          showToast("File CV belum tersedia. Silakan hubungi admin.", 3000);
          console.warn(
            `File ${cvFileName} tidak ditemukan. Letakkan file CV di folder root.`,
          );
        }
      })
      .catch(() => {
        showToast("File CV belum tersedia. Silakan hubungi admin.", 3000);
      });
  });
}

// ========== HOVER ANIMATION FOR CARDS ==========
const cards = document.querySelectorAll(
  ".exp-card, .edu-card, .language-box, .contact-box, .project-card",
);
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
    card.style.transition = "transform 0.3s ease";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// ========== BUTTON RIPPLE EFFECT ==========
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.4)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "rippleEffect 0.6s ease-out";
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========== BACKGROUND PARTICLE EFFECT (Opsional) ==========
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
  document.body.insertBefore(particleContainer, document.body.firstChild);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: var(--primary);
            border-radius: 50%;
            opacity: ${Math.random() * 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    particleContainer.appendChild(particle);
  }
}

// Uncomment jika ingin efek partikel (optional)
// createParticles();

const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.1;
        }
        90% {
            opacity: 0.1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ========== SCROLL PROGRESS BAR ==========
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--primary);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + "%";
});

// ========== WELCOME CONSOLE ==========
console.log(
  "%c✨ Portfolio Amar Apriyadi ✨",
  "color: #2563eb; font-size: 16px; font-weight: bold;",
);
console.log(
  "%cDark/Light Mode Active | Animations Ready | Download CV Ready",
  "color: #10b981; font-size: 12px;",
);

// ========== INITIALIZE ALL ==========
document.addEventListener("DOMContentLoaded", () => {
  // Small delay for initial animations
  setTimeout(() => {
    document.querySelector(".hero-info")?.classList.add("animated");
  }, 100);
});
