// Toggle Navigation Menu
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Display Current Year
document.querySelector('#year').textContent = new Date().getFullYear();

// Display Last Modified Date
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;

const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#primary-navigation');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
});