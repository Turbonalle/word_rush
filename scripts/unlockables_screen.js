import { ProgressManager } from "./ProgressManager.js";
import { UnlockManager } from "./UnlockManager.js";
import { modeToUnlockables, unlockablesToMode } from "./screen_switch.js";
import { SONG_SVG, MODE_SVG } from "./svg.js";

function updateUnlockablesScreen() {
	// Story progress
	document.getElementById("collect10stars").classList.toggle("unlocked", UnlockManager.isModeUnlocked("zen"));
	document.getElementById("collect20stars").classList.toggle("unlocked", UnlockManager.isModeUnlocked("hard"));
	document.getElementById("collect30stars").classList.toggle("unlocked", UnlockManager.isModeUnlocked("panic"));
	// Modes
	document.getElementById("finishedDailyLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedDailyLevel"));
	document.getElementById("finishedZenLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedZenLevel"));
	document.getElementById("finishedHardLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedHardLevel"));
	document.getElementById("finishedPanicLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedPanicLevel"));
	// Other
	document.getElementById("find1000Words").classList.toggle("unlocked", ProgressManager.getWordsFound() >= 1000);
	document.getElementById("finishWordLength10").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishWordLength10"));
	document.getElementById("finishStoryMode").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishStoryMode"));

	// Add SVG to unlockable containers
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