// This is done to make the header links black depending on the page
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("header a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});