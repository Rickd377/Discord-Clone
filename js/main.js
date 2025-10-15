const channels = document.querySelectorAll(".channel");
const channelIcons = document.querySelectorAll(".channel .channel-icon");

channels.forEach((channel) => {
  channel.addEventListener("click", () => {
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