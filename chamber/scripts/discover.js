// ===============================
// FETCH AND DISPLAY DISCOVER CARDS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadDiscoverCards();
  displayVisitMessage();
});

async function loadDiscoverCards() {
  const container = document.querySelector(".card-container");

  // Ensure container exists before proceeding
  if (!container) return;

  try {
    const response = await fetch("data/discover.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure the JSON contains an array
    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML =
        "<p class='error'>No attractions available at this time.</p>";
      return;
    }

    // Clear existing content
    container.innerHTML = "";

    data.forEach(place => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" 
               alt="Image of ${place.name}" 
               loading="lazy"
               decoding="async"
               width="400"
               height="250">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <a href="${place.url}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="btn"
           aria-label="Learn more about ${place.name}">
           Learn More
        </a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
    container.innerHTML =
      "<p class='error'>Unable to load attractions. Please check your JSON file.</p>";
  }
}

// ===============================
// LAST VISIT MESSAGE USING LOCALSTORAGE
// ===============================
function displayVisitMessage() {
  const message = document.querySelector("#visit-message");

  // Exit if the element does not exist
  if (!message) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = Date.now();
  let visitText = "";

  if (!lastVisit) {
    visitText = "Welcome! This is your first visit.";
  } else {
    const days = Math.floor(
      (currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (days < 1) {
      visitText = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitText = "You last visited 1 day ago.";
    } else {
      visitText = `You last visited ${days} days ago.`;
    }
  }

  message.textContent = visitText;

  // Store current visit date
  localStorage.setItem("lastVisit", currentDate);
}