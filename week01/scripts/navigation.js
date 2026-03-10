const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});