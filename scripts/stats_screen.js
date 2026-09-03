import { Save } from "./save.js";
import { ProgressManager } from "./ProgressManager.js";
import { modeToStats, statsToMode } from "./screen_switch.js";

function updateStatsScreen() {
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
}

document.getElementById("mode-to-stats-button").addEventListener("click", () => {
	modeToStats();
	updateStatsScreen();
});

document.getElementById("stats-to-mode-button").addEventListener("click", () => {
	statsToMode();
});