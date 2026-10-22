
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const themeToggle = document.getElementById("themeToggle");
    const yearElement = document.getElementById("year");

    // Automatically update the footer year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close mobile menu after selecting a section
    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        });
    });

    // Light and dark theme toggle
    function updateThemeButton() {
        const isLight = document.body.classList.contains("light-theme");
        themeToggle.textContent = isLight ? "☾" : "☀";
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        updateThemeButton();
    });

    updateThemeButton();

    // Reveal elements as they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Highlight the current section in the navigation
    const sections = document.querySelectorAll("main section[id]");
    const sectionLinks = navLinks.querySelectorAll('a[href^="#"]');

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        sectionLinks.forEach((link) => {
                            const isCurrent =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle("active", isCurrent);
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
});
