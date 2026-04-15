const params = new URLSearchParams(window.location.search);
const results = document.querySelector("#results");

let output = "<h3>Your Submitted Details</h3>";

params.forEach((value, key) => {
    output += `<p><strong>${key}:</strong> ${value}</p>`;
});

results.innerHTML = output;

// Footer Details
document.querySelector("#year").textContent = new Date().getFullYear();