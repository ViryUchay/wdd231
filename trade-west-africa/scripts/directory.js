import { initModal, openModal } from "./modal.js";

const directory = document.querySelector("#directory");
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

// Initialize the modal
initModal();

/**
 * Fetch producer data from JSON.
 */
async function getProducers() {
    try {
        const response = await fetch("data/producers.json");

        if (!response.ok) {
            throw new Error("Failed to fetch producer data.");
        }

        const producers = await response.json();
        displayProducers(producers);
    } catch (error) {
        console.error("Fetch Error:", error);
        directory.innerHTML =
            "<p class='error'>Unable to load data. Please try again later.</p>";
    }
}

/**
 * Display producer cards dynamically.
 */
function displayProducers(producers) {
    directory.innerHTML = "";

    producers.forEach((producer) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
      <img src="${producer.image}" alt="${producer.name}" loading="lazy">
      <h3>${producer.name}</h3>
      <p><strong>Crop:</strong> ${producer.crop}</p>
      <p><strong>Location:</strong> ${producer.location}</p>
      <button class="details-btn">View Details</button>
    `;

        card.querySelector(".details-btn").addEventListener("click", () => {
            openModal(producer);
        });

        directory.appendChild(card);
    });
}

/**
 * Toggle Grid and List Views with Local Storage.
 */
gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
    localStorage.setItem("view", "grid");
});

listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
    localStorage.setItem("view", "list");
});

// Load Saved View
const savedView = localStorage.getItem("view");
if (savedView) {
    directory.classList.add(savedView);
}

// Initialize Data Fetch
getProducers();