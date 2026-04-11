// ===============================
// FETCH AND DISPLAY DISCOVER CARDS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadDiscoverCards();
  displayVisitMessage();
});

async function loadDiscoverCards() {
  const container = document.querySelector(".card-container");

  try {
    const response = await fetch("data/discover.json");

    if (!response.ok) {
      throw new Error("Failed to fetch discover data.");
    }

    const data = await response.json();

    data.forEach(place => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" 
               alt="Image of ${place.name}" 
               loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <a href="${place.url}" target="_blank" 
           rel="noopener noreferrer" class="btn">
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
  if (!message) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = Date.now();

  if (!lastVisit) {
    message.textContent = "Welcome! This is your first visit.";
  } else {
    const days = Math.floor(
      (currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (days < 1) {
      message.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      message.textContent = "You last visited 1 day ago.";
    } else {
      message.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentDate);
}