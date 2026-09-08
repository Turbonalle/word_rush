export const UnlockNotificationManager = {
	container: null,

	init() {
		this.container = document.getElementById("unlock-notifications");
	},

	show(title, message) {
		const notification = document.createElement("div");
		notification.className = "unlock-notification";
		notification.innerHTML = `
			<div class="unlock-title">${title}</div>
			<div class="unlock-message">${message}</div>
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