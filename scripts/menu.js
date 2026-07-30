import { game, showGame } from "./main.js";
import { startGame } from "./game.js";

const modesContainer = document.getElementById("modes-container");
const storyModeButton = document.getElementById("story-mode-button");
const basicModeButton = document.getElementById("basic-mode-button");
const panicModeButton = document.getElementById("panic-mode-button");
const testModeButton = document.getElementById("test-mode-button");
const settingsContainers = document.querySelectorAll(".settings-container");
const playButtons = document.querySelectorAll("#play-button");
const backButtons = document.querySelectorAll("#back-button");

function hideModesMenu() {
	modesContainer.classList.add("hidden");
}

function showModesMenu() {
	modesContainer.classList.remove("hidden");
}

function resetActiveButtons() {
	const modeButtons = document.querySelectorAll(".mode-button");
	console.log("We have " + modeButtons.length + " mode buttons");
	for (let i = 0; i < modeButtons.length; i++) {
		console.log("Removing 'active' from modeButtons[" + i + "]");
		modeButtons[i].classList.remove("active-button");
	}
}

function hideSettingsContainers() {
	for (let i = 0; i < settingsContainers.length; i++) {
		settingsContainers[i].classList.add("hidden");
	}
}

storyModeButton.addEventListener("click", () => {
	game.mode = "story";
	console.log("Clicked story button");
	resetActiveButtons();
	storyModeButton.classList.add("active-button");
	hideModesMenu();
	document.getElementById("story-settings-container").classList.remove("hidden");
});

basicModeButton.addEventListener("click", () => {
	game.mode = "basic";
	resetActiveButtons();
	basicModeButton.classList.add("active-button");
	hideModesMenu();
	document.getElementById("basic-settings-container").classList.remove("hidden");
});

panicModeButton.addEventListener("click", () => {
	game.mode = "panic";
	resetActiveButtons();
	panicModeButton.classList.add("active-button");
	hideModesMenu();
	document.getElementById("panic-settings-container").classList.remove("hidden");
});

testModeButton.addEventListener("click", () => {
	game.mode = "test";
	resetActiveButtons();
	testModeButton.classList.add("active-button");
	hideModesMenu();
	document.getElementById("test-settings-container").classList.remove("hidden");
});

function addBackButtonListeners() {
	for (let i = 0; i < backButtons.length; i++) {
		backButtons[i].addEventListener("click", () => {
			game.mode = "";
			resetActiveButtons();
			hideSettingsContainers();
			showModesMenu();
		})
	}
}

function addPlayButtonListeners() {
	for (let i = 0; i < playButtons.length; i++) {
		playButtons[i].addEventListener("click", () => {
			game.state = "";
			startGame();
			showGame();
		})
	}
}

addBackButtonListeners();
addPlayButtonListeners();