const dropdowns = document.querySelectorAll(".dropdown-topbar");

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector(".dropdown-btn");
  const content = dropdown.querySelector(".dropdown-content");

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasClicked = dropdown.classList.contains("clicked");
    dropdowns.forEach(d => d.classList.remove("clicked"));
    if (!wasClicked) dropdown.classList.add("clicked");
  });

  // Prevent closing when clicking inside dropdown content
  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// Close dropdowns when clicking outside any dropdown
document.addEventListener("click", () => {
  dropdowns.forEach(d => d.classList.remove("clicked"));
});

const muteOption = document.querySelector(".button-option.mute");
const muteBtn = muteOption.querySelector(".mute-btn");
const muteSpan = muteOption.querySelector(".mute-span");
const muteIcon = document.querySelector(".notifications-icon");

muteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (muteSpan.innerHTML === "Mute Channel") {
    muteSpan.innerHTML = "Unmute Channel";
    muteIcon.className = "fa-solid fa-bell-slash notifications-icon";
    dropdowns.forEach(d => d.classList.remove("clicked"));
  } else {
    muteSpan.innerHTML = "Mute Channel";
    muteIcon.className = "fa-solid fa-bell notifications-icon";
    dropdowns.forEach(d => d.classList.remove("clicked"));
  }
});