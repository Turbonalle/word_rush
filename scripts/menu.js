import { game } from "./main.js";
import { LevelManager } from "./LevelManager.js";
import { settingsToGame, settingsToMode } from "./screen_switch.js";
import { startGame } from "./game.js";
import { getElement } from "./helper_functions.js";

const storyModeButton = document.getElementById("story-mode-button");
const basicModeButton = document.getElementById("basic-mode-button");
const panicModeButton = document.getElementById("panic-mode-button");
const testModeButton = document.getElementById("test-mode-button");

function hideModesMenu() {
	const modesContainer = document.getElementById("modes-container");
	modesContainer.classList.add("hidden");
}

export function resetActiveButtons() {
	document.querySelectorAll(".mode-button").forEach(button => {
		button.classList.remove("active-button");
	});
}

storyModeButton.addEventListener("click", () => {
	game.mode = "story";
	console.log("Clicked story button");
	resetActiveButtons();
	storyModeButton.classList.add("active-button");
	hideModesMenu();
	document.getElementById("story-settings-container").classList.remove("hidden");
	LevelManager.buildStoryLevels(game.language, levelId => {
		game.storyLevelId = levelId;
		startGame();
	});
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
	const backButtons = document.querySelectorAll(".back-button");
	for (let i = 0; i < backButtons.length; i++) {
		backButtons[i].addEventListener("click", () => {
			settingsToMode();
		});
	}
}

function addPlayButtonListeners() {
	const playButtons = document.querySelectorAll(".play-button");
	for (let i = 0; i < playButtons.length; i++) {
		playButtons[i].addEventListener("click", () => {
			settingsToGame(game.mode);
			startGame();
		});
	}
}

function setLengthSlider(mode) {
	const lengthSlider = getElement(mode, "-length-slider");
	const lengthValue = getElement(mode, "-length-value");
	lengthSlider.addEventListener("input", () => {
		lengthValue.textContent = lengthSlider.value;
		game.wordLength = parseInt(lengthSlider.value);
	});
}

addBackButtonListeners();
addPlayButtonListeners();
setLengthSlider("basic");
setLengthSlider("panic");