// Smooth scroll to sections
function scrollToSection(id) {
    const targetSection = document.getElementById(id);
    if (targetSection) {
        // Calculate offset for sticky nav bar (approx 80px)
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================
       SCROLL PROGRESS & NAVBAR SHADOW
       ========================================== */
    const scrollProgress = document.getElementById("scroll-progress");
    const nav = document.querySelector("nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        // Scroll Progress Bar
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }

        // Navbar Background Switch
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }

        // Active Section Navigation Indicator
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================================
       MOBILE RESPONSIVE HAMBURGER NAVIGATION
       ========================================== */
    const menuToggle = document.getElementById("mobile-menu");
    const navLinksList = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li a");

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinksList.classList.toggle("active");
        });

        // Close menu drawer when clicking a navigation link
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinksList.classList.remove("active");
            });
        });
    }

    /* ==========================================
       INTERACTIVE PROJECTS DETAIL MODAL
       ========================================== */
    const projectData = {
        instagram: {
            title: "Instagram Logo Clone",
            image: "./Instagram icon.jpg",
            desc: "A pure CSS art challenge focused on recreating the iconic Instagram camera glyph. Utilizing layered absolute offsets, dynamic radial/linear gradient blend modes, border radius parameters, and heavy box-shadow manipulation, this project demonstrates high-fidelity visual layout modeling using raw stylesheet declarations without media assets.",
            tech: ["HTML5", "CSS3 Gradient Art", "Layout Positioning"]
        },
        netflix: {
            title: "Netflix Storefront Clone",
            image: "./download.jpg",
            desc: "A frontend clone of the Netflix web landing board and entry page. Includes movie visual categories, hero spotlight sliders, and interactive styled Accordion drawers designed to render frequently asked questions smoothly. The page is engineered to follow professional asset sizing and typographic scales.",
            tech: ["HTML5", "CSS3 Flexbox", "ES6 JavaScript Accordions"]
        },
        portfolio: {
            title: "Developer Portfolio Website",
            image: "./Screenshot 2026-07-01 190829.png",
            desc: "A premium interactive presentation of developer capabilities, skills, and portfolio history. Designed from scratch utilizing modern dark themes, responsive multi-column layouts, custom CSS animations, scroll depth tracking, and smooth responsive navigation drawers.",
            tech: ["HTML5 semantic tags", "CSS Glassmorphism", "JavaScript Animations"]
        },
        amazon: {
            title: "Amazon Shopping UI Clone",
            image: "./Dark Fantasy - Masked Virginity🎭.jpg",
            desc: "A highly responsive mock interface mimicking Amazon's primary search landing and shopping card display. It utilizes custom grid layouts, visual hover zoom cards, slide-out hamburger sidebars, and sub-header navigation. Designed to test structured data presentation on fluid layouts.",
            tech: ["CSS Grid", "JavaScript UI Controls", "Responsive Design"]
        },
        calculator: {
            title: "Modern Glassmorphic Calculator",
            image: "./dark fantasy witch stone cottage.jpg",
            desc: "A responsive standard calculator application that executes floating-point mathematical computations dynamically. Implements clean button grid actions, keypress bindings, history memory displays, and interactive light/dark elements styled with transparent backdrops.",
            tech: ["HTML5", "CSS Glassmorphism", "JS Math Logic"]
        },
        todo: {
            title: "Interactive Client-Side To-Do Board",
            image: "./Dark Fantasy 🥀 Silent Watcher.jpg",
            desc: "A client-side productivity manager enabling users to structure, search, categorize, and complete tasks. Implements category filter options, task priority tags, and clean slide-out animations upon task additions and deletions.",
            tech: ["ES6 JavaScript", "CSS Keyframe Transitions", "Local Storage Mock"]
        }
    };

    const modal = document.getElementById("project-modal");
    const modalDetails = document.getElementById("modal-project-details");
    const modalClose = document.querySelector(".modal-close");
    const viewProjectBtns = document.querySelectorAll(".view-project-btn");

    if (modal && modalDetails) {
        // Open Modal
        viewProjectBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const projectId = btn.getAttribute("data-project");
                const project = projectData[projectId];

                if (project) {
                    // Generate Tech Badges HTML
                    const techBadges = project.tech
                        .map(t => `<span>${t}</span>`)
                        .join("");

                    // Inject template
                    modalDetails.innerHTML = `
                        <img class="modal-img" src="${project.image}" alt="${project.title}">
                        <div class="modal-body">
                            <h3>${project.title}</h3>
                            <p>${project.desc}</p>
                            <div class="modal-tech">
                                ${techBadges}
                            </div>
                        </div>
                    `;

                    // Trigger transition classes
                    modal.classList.add("open");
                    document.body.style.overflow = "hidden"; // Prevent page scroll
                }
            });
        });

        // Close Modal via click Close Icon
        if (modalClose) {
            modalClose.addEventListener("click", closeModal);
        }

        // Close Modal via click backdrop
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close Modal via escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("open")) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove("open");
            document.body.style.overflow = ""; // Re-enable scroll
        }
    }

    /* ==========================================
       SCROLL-TRIGGERED FADE-IN ANIMATIONS
       ========================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatableElements = document.querySelectorAll(
        "section, .card, .timeline-item, .skill-card, .project-card, .contact-form, .contact-details, .quote-card"
    );

    animatableElements.forEach(el => {
        el.classList.add("hidden");
        scrollObserver.observe(el);
    });

    /* ==========================================
       TYPING & BACKSPACE ANIMATION (FIXED BUG)
       ========================================== */
    const textArray = [
    "A Student",
    "Learning HTML, CSS & JavaScript",
    "Front-End Development Enthusiast",
    "Building Small Projects"
];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    function typeEffect() {
        if (!typingElement) return; // Fail-safe check

        const currentText = textArray[index];

        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex++);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex--);
        }

        let speed = isDeleting ? 40 : 85;

        // Completed typing full string
        if (!isDeleting && charIndex === currentText.length + 1) {
            isDeleting = true;
            speed = 1500; // Delay before starting backspace
        }

        // Completed deleting full string
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % textArray.length;
            speed = 350; // Pause before typing next word
        }

        setTimeout(typeEffect, speed);
    }

    // Launch text typing loops safely
    if (typingElement) {
        typeEffect();
    }

    /* ==========================================
       CONTACT FORM SUBMIT & TOAST POPUPS
       ========================================== */
    const contactForm = document.getElementById("contact-form");
    const toastContainer = document.getElementById("toast-container");

    function triggerToast(message, type = "success") {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        
        const icon = type === "success" ? "✓" : "✗";
        toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
        
        toastContainer.appendChild(toast);

        // Slide out and remove toast on duration expiry
        setTimeout(() => {
            toast.classList.add("toast-closing");
            toast.addEventListener("animationend", () => {
                toast.remove();
            });
            // Fallback for browsers not firing animationend
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameVal = document.getElementById("form-name").value.trim();
            const emailVal = document.getElementById("form-email").value.trim();
            const messageVal = document.getElementById("form-message").value.trim();
            const submitBtn = contactForm.querySelector(".btn-submit");

            // Safeguard inputs
            if (!nameVal || !emailVal || !messageVal) {
                triggerToast("Please fill out all the input fields before sending.", "error");
                return;
            }

            // Simple Email Regex check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                triggerToast("Please supply a valid email address.", "error");
                return;
            }

            // Set Form Loading visual state
            submitBtn.classList.add("loading");

            // Mock network call/delivery latency
            setTimeout(() => {
                submitBtn.classList.remove("loading");
                triggerToast(`Thank you, ${nameVal}! Your message has been sent successfully.`, "success");
                contactForm.reset();
            }, 1800);
        });
    }
});