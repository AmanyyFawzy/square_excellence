document.addEventListener("DOMContentLoaded", function () {

  // Navbar animation when scrolling
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
  const counters = document.querySelectorAll('.counter');

  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const speed = 100;
    const increment = Math.ceil(target / speed);
    let count = 0;

    function update() {
      if (count < target) {
        count += increment;
        counter.innerText = count;
        setTimeout(update, 20);
      } else {
        counter.innerText = target + "+";
      }
    }

    update();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          // Reset count to 0 before starting
          counter.innerText = "0";
          animateCounter(counter);
        });
      }
    });
  }, {
    threshold: 0.5, // animation start when appear 50% from screen
  });

  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }

  
  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      alert("شكراً لتواصلكم! سنعود إليكم في أقرب وقت.");
    });
  }

  // Toggle Language
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
              element.innerHTML = data[key];
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

  // load lang stored in localStorage
  loadLanguage(currentLang);
});
