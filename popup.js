// Function to load setting values
function loadSetting(key, toggleElement, statusElement) {
    chrome.runtime.sendMessage({ action: "getConfigState", key: key }, (response) => {
        const value = response.value ?? false;
        toggleElement.checked = value;
        statusElement.textContent = value ? "On" : "Off";
    });
}

// Function to update setting
function updateSetting(key, toggleElement, statusElement) {
    const value = toggleElement.checked;
    chrome.runtime.sendMessage({ action: "setConfigState", key: key, value: value });
    statusElement.textContent = value ? "On" : "Off";
}

// Setup toggles
document.addEventListener("DOMContentLoaded", () => {
    const transitionsToggle = document.getElementById("transitionsToggle");
    const moneyToggle = document.getElementById("moneyToggle");
    const robuxToggle = document.getElementById("robuxToggle");

    const transitionsStatus = document.getElementById("transitionsStatus");
    const moneyStatus = document.getElementById("moneyStatus");
    const robuxStatus = document.getElementById("robuxStatus");

    loadSetting("transitions", transitionsToggle, transitionsStatus);
    loadSetting("hideMoney", moneyToggle, moneyStatus);
    loadSetting("hideRobux", robuxToggle, robuxStatus);

    transitionsToggle.addEventListener("change", () => updateSetting("transitions", transitionsToggle, transitionsStatus));
    moneyToggle.addEventListener("change", () => updateSetting("hideMoney", moneyToggle, moneyStatus));
    robuxToggle.addEventListener("change", () => updateSetting("hideRobux", robuxToggle, robuxStatus));
});
