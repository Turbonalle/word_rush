import { modeToProgress, progressToMode } from "./screen_switch.js";

document.getElementById("mode-to-progress-button").addEventListener("click", () => {
	modeToProgress();
});

document.getElementById("progress-to-mode-button").addEventListener("click", () => {
	progressToMode();
});

