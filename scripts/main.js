// Hamburger menu

const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});


// Dynamic year

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// Last modified date

document.querySelector("#lastModified").textContent =
    "Last Modified: " + document.lastModified;