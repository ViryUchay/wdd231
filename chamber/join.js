// ==============================
// TIMESTAMP (REQUIRED)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
});

// ==============================
// MODAL CONTROL (ACCESSIBLE)
// ==============================
const modals = {
    np: document.getElementById("npModal"),
    bronze: document.getElementById("bronzeModal"),
    silver: document.getElementById("silverModal"),
    gold: document.getElementById("goldModal")
};

// Open modal
function openModal(type) {
    if (modals[type]) {
        modals[type].showModal();
    }
}

// Close modal
function closeModal(type) {
    if (modals[type]) {
        modals[type].close();
    }
}

// ==============================
// CLOSE MODAL ON BACKDROP CLICK
// ==============================
Object.values(modals).forEach(modal => {
    if (modal) {
        modal.addEventListener("click", (e) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog =
                rect.top <= e.clientY &&
                e.clientY <= rect.bottom &&
                rect.left <= e.clientX &&
                e.clientX <= rect.right;

            if (!isInDialog) {
                modal.close();
            }
        });
    }
});

// ==============================
// KEYBOARD ACCESSIBILITY (ESC)
// ==============================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        Object.values(modals).forEach(modal => {
            if (modal && modal.open) modal.close();
        });
    }
});

// Update the last modified date in the footer
document.getElementById("lastModified").textContent = document.lastModified;

