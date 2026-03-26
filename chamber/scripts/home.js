// WEATHER
async function getWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather data failed");
        }

        const data = await response.json();

        document.getElementById("temp").textContent =
            data.list[0].main.temp.toFixed(1);

        const desc = data.list[0].weather[0].description;
        document.getElementById("desc").textContent =
            desc.charAt(0).toUpperCase() + desc.slice(1);

        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = "";

        const labels = ["Today", "Tomorrow", "Day 3"];

        for (let i = 0; i < 3; i++) {
            const day = data.list[i * 8];

            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>${labels[i]}</strong></p>
                <p>${day.main.temp.toFixed(1)}°C</p>
            `;
            forecastContainer.appendChild(div);
        }

    } catch (error) {
        console.error("Weather error:", error);
    }
}

document.getElementById("lastModified").textContent =
    document.lastModified;

function displayMembers(members) {
  const container = document.querySelector('#spotlights-grid');
  container.innerHTML = ""; // Clear existing content

  // Filter for gold or silver members if required by your assignment
  const featured = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver')
                          .sort(() => 0.5 - Math.random()) // Shuffle
                          .slice(0, 3); // Pick top 3

  featured.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card'); // Matches our CSS

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p class="tagline"><em>"${member.tagline}"</em></p>
      <hr>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p class="membership-level">${member.membership} Member</p>
    `;

    container.appendChild(card);
  });
}    

const membersURL = "data/members.json"; // Update path if needed

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        } else {
            console.error("Could not load member data.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displaySpotlights(members) {
    const mainContainer = document.querySelector('#spotlights-grid');
    
    // 1. Filter for Gold and Silver only
    const eligibleMembers = members.filter(m => 
        m.membership === 'Gold' || m.membership === 'Silver'
    );

    // 2. Shuffle and pick 3 random members
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // 3. Clear and build the HTML
    mainContainer.innerHTML = ""; 

    selected.forEach(member => {
        const card = document.createElement('article');
        card.className = 'member-card';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p><em>"${member.tagline}"</em></p>
            <hr>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership-level">${member.membership} Member</p>
        `;
        mainContainer.appendChild(card);
    });
}

// Initialize the call
getMembers();