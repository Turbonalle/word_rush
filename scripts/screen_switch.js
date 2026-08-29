import { game } from "./main.js";
import { getElement } from "./helper_functions.js";
import { getRandomWinningTitle } from "./winning_title.js";

export function modeToSettings() {
	document.getElementById("title-screen").classList.add("hidden");
	document.getElementById("menu-screen").classList.remove("hidden");
	getElement(game.mode, "-settings-container").classList.remove("hidden");
}

export function settingsToGame(mode) {
	game.state = "game";
	game.mode = mode;
	document.getElementById("menu-screen").classList.add("hidden");
	getElement(game.mode, "-settings-container").classList.add("hidden");
	getElement(game.mode, "-game-screen").classList.remove("hidden");
}

export function settingsToMode() {
	getElement(game.mode, "-settings-container").classList.add("hidden");
	document.getElementById("menu-screen").classList.add("hidden");
	document.getElementById("title-screen").classList.remove("hidden");
	game.mode = "";
}

export function gameToMode() {
	game.wordLength = game.storedWordLength;
	getElement(game.mode, "-game-screen").classList.add("hidden");
	document.getElementById("title-screen").classList.remove("hidden");
	game.state = "menu";
	game.mode = "";
	document.getElementById("winning-screen").classList.add("hidden");
}

export function gameToSettings() {
	game.wordLength = game.storedWordLength;
	getElement(game.mode, "-game-screen").classList.add("hidden");
	document.getElementById("menu-screen").classList.remove("hidden");
	getElement(game.mode, "-settings-container").classList.remove("hidden");
	game.state = "menu";
	document.getElementById("winning-screen").classList.add("hidden");
}

export function modeToProgress() {
	document.getElementById("title-screen").classList.add("hidden");
	document.getElementById("progress-screen").classList.remove("hidden");
	
}

export function progressToMode() {
	document.getElementById("title-screen").classList.remove("hidden");
	document.getElementById("progress-screen").classList.add("hidden");
}

export function showWinningScreen() {
	document.getElementById("winning-title").textContent = getRandomWinningTitle();
	document.getElementById("winning-screen").classList.remove("hidden");
}

export function hideWinningScreen() {
	document.getElementById("winning-screen").classList.add("hidden");
}