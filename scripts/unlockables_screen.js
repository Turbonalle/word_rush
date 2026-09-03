import { ProgressManager } from "./ProgressManager.js";
import { modeToUnlockables, unlockablesToMode } from "./screen_switch.js";
import { SONG_SVG, MODE_SVG } from "./svg.js";

function updateUnlockablesScreen() {
	//Unlockables
	document.getElementById("finishedDailyLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedDailyLevel"));
	document.getElementById("finishedZenLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedZenLevel"));
	document.getElementById("finishedHardLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedHardLevel"));
	document.getElementById("finishedPanicLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedPanicLevel"));

	document.querySelectorAll(".song-svg").forEach(element => {
		element.innerHTML = SONG_SVG;
	});

	document.querySelectorAll(".mode-svg").forEach(element => {
		element.innerHTML = MODE_SVG;
	});
}

document.getElementById("mode-to-unlockables-button").addEventListener("click", () => {
	modeToUnlockables();
	updateUnlockablesScreen();
});

document.getElementById("unlockables-to-mode-button").addEventListener("click", () => {
	unlockablesToMode();
});