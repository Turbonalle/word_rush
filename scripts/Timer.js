import { game } from "./main.js";

export const Timer = {
	timerElements: {
		container: null,
		seconds: null,
		progress: null
	},
	circumference: 2 * Math.PI * 70,

	init() {
		this.timerElements.container = document.getElementById("panic-timer-container");
		this.timerElements.seconds = document.getElementById("panic-timer-seconds");
		this.timerElements.progress = document.getElementById("panic-timer-progress");
	},

	start(seconds) {
		this.stop();
		game.timer.duration = seconds;
		game.timer.timeRemaining = seconds;
		game.timer.endTime = Date.now() + seconds * 1000;
		game.timer.running = true;
		this.updateDisplay();
		game.timer.intervalId = setInterval(() => {
			this.update();
		}, 100);
	},

	update() {
		if (!game.timer.running)
			return;
		const remaining = Math.max(0, game.timer.endTime - Date.now());
		game.timer.timeRemaining = remaining / 1000;
		this.updateDisplay();
		if (remaining <= 0) {
			this.finish();
		}
	},

	add(seconds) {
		if (!game.timer.running)
			return;
		game.timer.endTime += seconds * 1000;
		this.update();
	},

	stop() {
		if (game.timer.intervalId !== null) {
			clearInterval(game.timer.intervalId);
			game.timer.intervalId = null;
		}
		game.timer.running = false;
	},

	finish() {
		this.stop();
		game.timer.timeRemaining = 0;
		this.updateDisplay();
		// endPanicMode();
	},

	updateDisplay() {
		const {
			container,
			seconds,
			progress
		} = this.timerElements;

		if (!container || !seconds || !progress) {
			return;
		}

		const remaining = Math.max(0, game.timer.timeRemaining);
		const duration = Math.max(1, game.timer.duration);
		const percentage = Math.min(remaining / duration, 1);
		const offset = this.circumference * (1 - percentage);

		console.log("remaining:", remaining);
		console.log("duration:", duration);
		console.log("percentage:", percentage);
		console.log("offset:", offset);
		
		seconds.textContent = Math.ceil(remaining);
		progress.style.strokeDashoffset = offset;

		container.classList.remove("warning", "critical");
		if (remaining <= 5) {
			container.classList.add("critical");
		} else if (remaining <= 10) {
			container.classList.add("warning");
		}
	}
};