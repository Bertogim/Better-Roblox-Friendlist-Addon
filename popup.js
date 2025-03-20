document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("transitionsToggle");
    const statusText = document.getElementById("status");

    // Default to true (checked) if no value is stored
    let defaultState = true;

    // Get stored value
    chrome.storage.sync.get(["transitions"], (data) => {
        const isEnabled = data.transitions ?? defaultState;
        toggle.checked = isEnabled;
        statusText.textContent = isEnabled ? "On" : "Off";
    });

    // Save changes when the user toggles
    toggle.addEventListener("change", () => {
        const isEnabled = toggle.checked;
        chrome.storage.sync.set({ transitions: isEnabled });
        statusText.textContent = isEnabled ? "On" : "Off";
    });
});
