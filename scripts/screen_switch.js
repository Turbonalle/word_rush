import { game } from "./main.js";
import { resetActiveButtons } from "./menu.js";
import { getElement } from "./helper_functions.js";

export function modeToSettings() {
	document.getElementById("modes-container").classList.add("hidden");
	getElement(game.mode, "-settings-container").classList.remove("hidden");
}

export function settingsToGame(mode) {
	game.state = "game";
	game.mode = mode;
	console.log("mode:", mode);
	document.getElementById("menu-screen").classList.add("hidden");
	getElement(game.mode, "-settings-container").classList.add("hidden");
	getElement(game.mode, "-game-screen").classList.remove("hidden");
	resetActiveButtons();
}

export function settingsToMode() {
	getElement(game.mode, "-settings-container").classList.add("hidden");
	document.getElementById("modes-container").classList.remove("hidden");
	game.mode = "";
	resetActiveButtons();
}

export function gameToMode() {
	getElement(game.mode, "-game-screen").classList.add("hidden");
	document.getElementById("menu-screen").classList.remove("hidden");
	document.getElementById("modes-container").classList.remove("hidden");
	game.state = "menu";
	game.mode = "";
}