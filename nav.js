// --- Mobile Menu Toggle functionality ---
const menuToggle = document.getElementById("menuToggle");
const navControlsContainer = document.getElementById("navLinks");

if (menuToggle && navControlsContainer) {
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        navControlsContainer.classList.toggle("show");
        this.classList.toggle("active");
        this.setAttribute("aria-expanded", String(!isExpanded));
        document.body.classList.toggle('no-scroll', !isExpanded);
    });
}

// --- Dropdown Menu Toggle functionality ---
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const parentDropdown = this.closest('.dropdown');
        const isActive = parentDropdown.classList.contains('show');

        document.querySelectorAll('.dropdown.show').forEach(openDropdown => {
            if (openDropdown !== parentDropdown) {
                openDropdown.classList.remove('show');
                openDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
        });

        parentDropdown.classList.toggle('show', !isActive);
        this.setAttribute('aria-expanded', String(!isActive));
    });
});

// --- Close Dropdowns/Mobile Menu when clicking outside ---
document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.show').forEach(drop => {
            drop.classList.remove('show');
            drop.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
    }

    const isMobileMenuOpen = navControlsContainer && navControlsContainer.classList.contains('show');
    const clickedInsideMenu = navControlsContainer && navControlsContainer.contains(e.target);
    const clickedToggle = menuToggle && menuToggle.contains(e.target);

    if (isMobileMenuOpen && !clickedInsideMenu && !clickedToggle) {
        navControlsContainer.classList.remove('show');
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    }
});

// --- Navigation Link Smooth Scroll with Offset ---
document.querySelectorAll('.nav-links-list a').forEach(link => {
    link.addEventListener('click', function(event) {
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }

        const href = this.getAttribute('href');

        if (href && href.startsWith('#') && href.length > 1) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault();

                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const offset = headerHeight + 0;
                const targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        }

        const isMobileMenuOpen = navControlsContainer && navControlsContainer.classList.contains('show');
        if (isMobileMenuOpen) {
            navControlsContainer.classList.remove('show');
            if (menuToggle) menuToggle.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }

        document.querySelectorAll('.dropdown.show').forEach(drop => {
            drop.classList.remove('show');
            drop.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
    });
});

// --- Banner Slider Functionality ---
document.addEventListener('DOMContentLoaded', function() {
    const bannerSlider = document.querySelector('.banner-slider');

    // Only run the script if the banner slider exists on the page
    if (bannerSlider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            slides[index].classList.add('active');
        }

        showSlide(currentSlide);

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
    }
});