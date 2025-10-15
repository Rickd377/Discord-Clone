async function loadChannels() {
  const response = await fetch('./data/channels.json');
  const data = await response.json();
  const devider = document.querySelector('.devider');

  data.channels.forEach(channel => {
    const channelHTML = `
      <div class="channel${channel.notifications ? ' notifications' : ''}" data-id="${channel.id}" data-name="${channel.name}">
        <div class="channel-icon">
          <img src="${channel.image}" alt="${channel.name}">
        </div>
      </div>
    `;
    devider.insertAdjacentHTML('afterend', channelHTML);
  });

  initializeChannelEventListeners();
}

function initializeChannelEventListeners() {
  const channels = document.querySelectorAll(".channel");
  const channelIcons = document.querySelectorAll(".channel .channel-icon");

  channels.forEach((channel) => {
  channel.addEventListener("click", () => {
    if (channel.classList.contains("add-channel")) {
      return;
    }

    channels.forEach(c => {
      c.classList.remove("selected");
      c.classList.remove("hovered");
      delete c.dataset.wasNotifications;
    });

    channel.classList.add("selected");
    
    if (channel.classList.contains("notifications")) {
      channel.classList.remove("notifications");
      channel.dataset.notificationsCleared = "true";
      delete channel.dataset.wasNotifications;
    }
  });
  });

  channelIcons.forEach((channelIcon) => {
    // mouseout event listener
    channelIcon.addEventListener("mouseover", () => {
      const parentChannel = channelIcon.closest(".channel");
      if (!parentChannel) return;

      if (parentChannel.classList.contains("selected")) return;

      parentChannel.classList.add("hovered");

      if (parentChannel && parentChannel.classList.contains("notifications") && parentChannel.dataset.notificationsCleared !== "true") {
        parentChannel.classList.remove("notifications");
        parentChannel.dataset.wasNotifications = "true";
      }
    });

    // mouseout event listener
    channelIcon.addEventListener("mouseout", () => {
      const parentChannel = channelIcon.closest(".channel");
      if (!parentChannel) return;

      parentChannel.classList.remove("hovered");

      if (parentChannel && parentChannel.dataset.wasNotifications === "true" && !parentChannel.classList.contains("selected") && parentChannel.dataset.notificationsCleared !== "true") {
        parentChannel.classList.add("notifications");
        delete parentChannel.dataset.wasNotifications;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadChannels);