import { Save } from "./save.js";
import { ProgressManager } from "./ProgressManager.js";
import { modeToProgress, progressToMode } from "./screen_switch.js";

const SONG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
</svg>`;

const MODE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad2-icon lucide-gamepad-2"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`;

function updateProgressScreen() {
	// Games
	document.getElementById("stat-gamesplayed").textContent = Save.getGamesPlayed();
	document.getElementById("stat-gamesfinished").textContent = Save.getGamesFinished();
	document.getElementById("stat-finishratio").textContent = `${Save.getFinishRatio()}%`;
	document.getElementById("stat-timesgivenup").textContent = Save.getTimesGivenUp();
	// Words and stars
	document.getElementById("stat-starscollected-en").textContent = ProgressManager.getTotalStarsAcquired("en");
	document.getElementById("stat-starscollected-sv").textContent = ProgressManager.getTotalStarsAcquired("sv");
	document.getElementById("stat-wordsfound").textContent = Save.getWordsFound();
	document.getElementById("stat-avgwordratio").textContent = `${Save.getAvgWordRatio()}%`;
	// Modes
	document.getElementById("stat-dailywordsstarted").textContent = Save.getDailyGamesPlayed();
	document.getElementById("stat-zenwordsstarted").textContent = Save.getZenGamesPlayed();
	document.getElementById("stat-hardwordsstarted").textContent = Save.getHardGamesPlayed();
	document.getElementById("stat-panicwordsstarted").textContent = Save.getPanicGamesPlayed();
	document.getElementById("stat-dailywordsfinished").textContent = Save.getDailyGamesFinished();
	document.getElementById("stat-zenwordsfinished").textContent = Save.getZenGamesFinished();
	document.getElementById("stat-hardwordsfinished").textContent = Save.getHardGamesFinished();
	document.getElementById("stat-panicwordsfinished").textContent = Save.getPanicGamesFinished();

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

document.getElementById("mode-to-progress-button").addEventListener("click", () => {
	modeToProgress();
	updateProgressScreen();
	console.log("Save:", Save.data);
});

document.getElementById("progress-to-mode-button").addEventListener("click", () => {
	progressToMode();
});