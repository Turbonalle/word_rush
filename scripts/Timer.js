import { game } from "./main.js";
import { getElement } from "./helper_functions.js";

export const Timer = {
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
			this.finish;
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
		endPanicMode();
	},

	updateDisplay() {
		console.log("Updating timer.");
		const timerElement = getElement(game.mode, "-timer");
		const seconds = Math.ceil(game.timer.timeRemaining);
		timerElement.textContent = `${seconds}s`;
		timerElement.classList.toggle("timer-warning", seconds <= 10);
	}
};



// Timer.js:53 Uncaught TypeError: Cannot set properties of null (setting 'textContent')
//     at Object.updateDisplay (Timer.js:53:28)
//     at Object.update (Timer.js:22:8)
//     at Timer.js:13:9
// updateDisplay	@	Timer.js:53
// update	@	Timer.js:22
// (anonymous)	@	Timer.js:13
// setInterval		
// start	@	Timer.js:12
// startGame	@	game.js:131
// (anonymous)	@	menu.js:74