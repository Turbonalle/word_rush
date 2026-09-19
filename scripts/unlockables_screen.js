import { ProgressManager } from "./ProgressManager.js";
import { UnlockManager } from "./UnlockManager.js";
import { CueManager } from "./CueManager.js";
import { modeToUnlockables, unlockablesToMode } from "./screen_switch.js";
import { SONG_SVG, MODE_SVG } from "./svg.js";

function updateUnlockablesScreen() {
	// Story progress
	document.getElementById("collect10Stars").classList.toggle("unlocked", UnlockManager.isModeUnlocked("zen"));
	document.getElementById("collect30Stars").classList.toggle("unlocked", UnlockManager.isModeUnlocked("hard"));
	document.getElementById("collect50Stars").classList.toggle("unlocked", UnlockManager.isModeUnlocked("panic"));
	// Modes
	document.getElementById("finishedDailyLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedDailyLevel"));
	document.getElementById("finishedZenLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedZenLevel"));
	document.getElementById("finishedHardLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedHardLevel"));
	document.getElementById("finishedPanicLevel").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedPanicLevel"));
	// Other
	document.getElementById("found100Words").classList.toggle("unlocked", ProgressManager.getWordsFound() >= 100);
	document.getElementById("found1000Words").classList.toggle("unlocked", ProgressManager.getWordsFound() >= 1000);
	document.getElementById("finishedWordLength10").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedWordLength10"));
	document.getElementById("finishedStoryMode").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedStoryMode"));
	document.getElementById("finishedBossBattle").classList.toggle("unlocked", ProgressManager.isAchievementUnlocked("finishedBossBattle"));

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

document.querySelectorAll(".unlockable-container").forEach(unlockable => {
	unlockable.addEventListener("mouseenter", (event) => {
		const id = event.currentTarget.id;
		CueManager.deactivate(id);
	});
});