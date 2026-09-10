export const UnlockNotificationManager = {
	container: null,

	init() {
		this.container = document.getElementById("unlock-notifications");
	},

	show(title, message) {
		const notification = document.createElement("div");
		notification.classList.add("unlock-notification");
		notification.innerHTML = `
			<div class="unlock-notification-title">${title}</div>
			<div class="unlock-notification-message">${message}</div>
		`;
		this.container.appendChild(notification);
		requestAnimationFrame(() => {
			notification.classList.add("show");
		});
		setTimeout(() => {
			notification.classList.remove("show");
			notification.classList.add("hide");
			setTimeout(() => {
				notification.remove();
			}, 400);
		}, 3000);
	}
};