import { game } from "./main.js";
import { getElementByMode } from "./helper_functions.js";
import { getRandomWinningTitle } from "./winning_title.js";
import { UnlockManager } from "./UnlockManager.js";

export function handleLockedModes() {
	document.getElementById("zen-mode-button").classList.toggle("hidden", !UnlockManager.isModeUnlocked("zen"));
	document.getElementById("hard-mode-button").classList.toggle("hidden", !UnlockManager.isModeUnlocked("hard"));
	document.getElementById("panic-mode-button").classList.toggle("hidden", !UnlockManager.isModeUnlocked("panic"));
}

export function modeToSettings() {
	document.getElementById("menu-background").classList.add("hidden");
	document.getElementById("title-screen").classList.add("hidden");
	document.getElementById("menu-screen").classList.remove("hidden");
	getElementByMode(game.mode, "-settings-container").classList.remove("hidden");
	document.querySelector(".play-button").classList.toggle("hidden", game.mode === "story");
}

export function settingsToGame(mode) {
	game.state = "game";
	game.mode = mode;
	document.getElementById("menu-screen").classList.add("hidden");
	getElementByMode(game.mode, "-settings-container").classList.add("hidden");
	getElementByMode(game.mode, "-game-screen").classList.remove("hidden");
}

export function settingsToMode() {
	getElementByMode(game.mode, "-settings-container").classList.add("hidden");
	document.getElementById("menu-screen").classList.add("hidden");
	document.getElementById("menu-background").classList.remove("hidden");
	document.getElementById("title-screen").classList.remove("hidden");
	game.mode = "";
	handleLockedModes();
}

export function gameToMode() {
	game.wordLength = game.storedWordLength;
	getElementByMode(game.mode, "-game-screen").classList.add("hidden");
	document.getElementById("winning-screen").classList.add("hidden");
	document.getElementById("menu-background").classList.remove("hidden");
	document.getElementById("title-screen").classList.remove("hidden");
	game.state = "menu";
	game.mode = "";
	handleLockedModes();
}

export function gameToSettings() {
	game.wordLength = game.storedWordLength;
	getElementByMode(game.mode, "-game-screen").classList.add("hidden");
	document.getElementById("menu-screen").classList.remove("hidden");
	getElementByMode(game.mode, "-settings-container").classList.remove("hidden");
	document.querySelector(".play-button").classList.toggle("hidden", game.mode === "story");
	game.state = "menu";
	document.getElementById("winning-screen").classList.add("hidden");
}

export function modeToStats() {
	document.getElementById("title-screen").classList.add("hidden");
	document.getElementById("stats-screen").classList.remove("hidden");
}

export function statsToMode() {
	document.getElementById("title-screen").classList.remove("hidden");
	document.getElementById("stats-screen").classList.add("hidden");
	handleLockedModes();
}

export function modeToUnlockables() {
	document.getElementById("title-screen").classList.add("hidden");
	document.getElementById("unlockables-screen").classList.remove("hidden");
}

export function unlockablesToMode() {
	document.getElementById("title-screen").classList.remove("hidden");
	document.getElementById("unlockables-screen").classList.add("hidden");
	handleLockedModes();
}

export function showWinningScreen() {
	document.getElementById("winning-title").textContent = getRandomWinningTitle();
	document.getElementById("winning-screen").classList.remove("hidden");
	if (game.mode === "story") {
		document.getElementById("winning-container").querySelector(".to-settings-button").textContent = "Back to chapter";
		document.getElementById("winning-container").querySelector(".next-level-button").classList.remove("hidden");
	} else {
		document.getElementById("winning-container").querySelector(".to-settings-button").textContent = "Settings";
		document.getElementById("winning-container").querySelector(".new-game-button").classList.remove("hidden");
	}
}

export function hideWinningScreen() {
	document.getElementById("winning-screen").classList.add("hidden");
	document.getElementById("winning-container").querySelector(".new-game-button").classList.add("hidden");
	document.getElementById("winning-container").querySelector(".next-level-button").classList.add("hidden");
}