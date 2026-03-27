// Timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Last Modified
document.getElementById("lastModified").textContent = document.lastModified;

// Open Modals
document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.getElementById(button.dataset.modal);
        modal.showModal();
    });
});

// Close Modals
document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.getElementById(button.dataset.close);
        modal.close();
    });
});