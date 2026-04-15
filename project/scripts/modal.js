/**
 * modal.js
 * Agri-Trade West Africa
 * Handles accessible modal dialog functionality.
 */

let modalElement = null;
let modalContentElement = null;
let closeButton = null;

/**
 * Initializes the modal and attaches event listeners.
 * @param {string} modalSelector - The modal dialog selector.
 * @param {string} contentSelector - The modal content container selector.
 * @param {string} closeSelector - The close button selector.
 */
export function initModal(
  modalSelector = "#producerModal",
  contentSelector = "#modalContent",
  closeSelector = "#closeModal"
) {
  modalElement = document.querySelector(modalSelector);
  modalContentElement = document.querySelector(contentSelector);
  closeButton = document.querySelector(closeSelector);

  if (!modalElement || !modalContentElement) {
    console.warn("Modal elements not found in the DOM.");
    return;
  }

  // Close button event
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside the content area
  modalElement.addEventListener("click", (event) => {
    const rect = modalElement.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (!isInDialog) {
      closeModal();
    }
  });

  // Close modal with the Escape key
  modalElement.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

/**
 * Opens the modal and injects dynamic content.
 * @param {Object} data - The producer or item data.
 */
export function openModal(data) {
  if (!modalElement || !modalContentElement) return;

  modalContentElement.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${data.image}" alt="${data.name}" loading="lazy">
    <p><strong>Crop:</strong> ${data.crop}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Contact:</strong> ${data.contact}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p>${data.description}</p>
  `;

  modalElement.showModal();
}

/**
 * Closes the modal dialog.
 */
export function closeModal() {
  if (modalElement && modalElement.open) {
    modalElement.close();
  }
}