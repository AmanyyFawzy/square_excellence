document.addEventListener("DOMContentLoaded", function () {
  // Sticky Navbar
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll Down Button
  const scrollDownBtn = document.getElementById("scrollDown");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      window.scrollBy({
        top: window.innerHeight - 80,
        behavior: "smooth",
      });
    });
  }

  // Counter Animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  // Start counters when section is in view
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(aboutSection);
      }
    },
    { threshold: 0.5 }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }

  // Portfolio Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert("شكراً لتواصلكم! سنعود إليكم في أقرب وقت.");
      this.reset();
    });
  }

  const toggleLangBtn = document.getElementById("toggle-lang-btn");
  let currentLang = localStorage.getItem("language") || "ar";

  function loadLanguage(lang) {
    fetch(`./lang/${lang}.json`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelectorAll("[data-lang]").forEach((element) => {
          const key = element.getAttribute("data-lang");
          if (data[key]) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
              element.placeholder = data[key];
            } else {
              element.textContent = data[key];
            }
          }
        });

        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;

        // تغيير الزر نفسه
        toggleLangBtn.textContent = lang === "ar" ? "English" : "العربية";
        toggleLangBtn.innerHTML =
          lang === "ar"
            ? '<i class="fas fa-globe"></i> العربية'
            : '<i class="fas fa-globe"></i> English';

        localStorage.setItem("language", lang);
        currentLang = lang;
      })
      .catch((error) => console.error("Error loading language file:", error));
  }

  toggleLangBtn.addEventListener("click", function () {
    const newLang = currentLang === "ar" ? "en" : "ar";
    loadLanguage(newLang);
  });

  // تحميل اللغة أول مرة
  loadLanguage(currentLang);
});
