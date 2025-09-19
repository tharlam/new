// Get the button element
const scrollTopBtn = document.getElementById("scrollTopBtn");

// When the user scrolls down 200px from the top of the document, show the button
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// When the user clicks on the button, scroll to the top of the document
scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents the default anchor link behavior
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
