/**
 * app.js
 * Core application logic: Navigation, Scroll Spy, Clipboard utilities,
 * Resume modal, and scroll animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. DYNAMIC YEAR
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION DRAWER
  const navToggle = document.getElementById("mobile-nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      mainNav.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile nav on outside click
    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target) && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  // 3. SCROLL SPY (ACTIVE NAV HIGHLIGHT)
  const sections = document.querySelectorAll("section[id]");
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const targetLink = document.querySelector(`.main-nav a[href*="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add("active");
        } else {
          targetLink.classList.remove("active");
        }
      }
    });
  }
  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // 4. TOAST NOTIFICATION UTILITY
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // 5. COPY TO CLIPBOARD BUTTONS
  const copyButtons = document.querySelectorAll("[data-copy-text]");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute("data-copy-text");
      const label = btn.getAttribute("data-copy-label") || "Text";
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`✓ ${label} copied to clipboard!`);
      } catch (err) {
        // Fallback for non-https or older browser permissions
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showToast(`✓ ${label} copied to clipboard!`);
      }
    });
  });

  // 6. RESUME DOWNLOAD & MODAL HANDLER
  const resumeModal = document.getElementById("resume-modal");
  const resumeModalClose = document.getElementById("resume-modal-close");
  const resumeModalDismiss = document.getElementById("resume-modal-dismiss");
  const resumeTriggers = document.querySelectorAll(".resume-download-btn");

  async function checkFileExists(url) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }

  resumeTriggers.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const resumeUrl = "Pradnya_Bapte_Resume.pdf";
      const exists = await checkFileExists(resumeUrl);

      if (exists) {
        // Direct download
        const a = document.createElement("a");
        a.href = resumeUrl;
        a.download = "Pradnya_Bapte_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("✓ Downloading Pradnya_Bapte_Resume.pdf");
      } else {
        // If file not yet placed, open informative modal without breaking
        e.preventDefault();
        if (resumeModal) {
          resumeModal.classList.add("open");
          resumeModal.setAttribute("aria-hidden", "false");
        }
      }
    });
  });

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove("open");
      resumeModal.setAttribute("aria-hidden", "true");
    }
  }

  if (resumeModalClose) resumeModalClose.addEventListener("click", closeResumeModal);
  if (resumeModalDismiss) resumeModalDismiss.addEventListener("click", closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // 7. BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 400) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "auto";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 8. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.1
    });

    document.querySelectorAll(".fade-in-section").forEach(section => {
      observer.observe(section);
    });
  } else {
    // Fallback
    document.querySelectorAll(".fade-in-section").forEach(section => {
      section.classList.add("is-visible");
    });
  }
});
