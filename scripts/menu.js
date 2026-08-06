import { game } from "./main.js";
import { LevelManager } from "./level_manager.js";
import { settingsToGame, settingsToMode } from "./screen_switch.js";
import { startGame } from "./game.js";

const modesContainer = document.getElementById("modes-container");
const storyModeButton = document.getElementById("story-mode-button");
const basicModeButton = document.getElementById("basic-mode-button");
const panicModeButton = document.getElementById("panic-mode-button");
const testModeButton = document.getElementById("test-mode-button");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");

function hideModesMenu() {
	modesContainer.classList.add("hidden");
}

function showModesMenu() {
	modesContainer.classList.remove("hidden");
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

// const englishButtons = document.querySelectorAll("#option-en");
// function addEnglishButtonListeners() {
// 	for (let i = 0; i < englishButtons.length; i++) {
// 		englishButtons[i].addEventListener("click", () => {
// 			swedishButtons[i].classList.remove("active");
// 			englishButtons[i].classList.add("active");
// 			game.language = "en";
// 		});
// 	}
// }

// function addSwedishButtonListeners() {
// 	const swedishButtons = document.querySelectorAll("#option-sv");
// 	for (let i = 0; i < swedishButtons.length; i++) {
// 		swedishButtons[i].addEventListener("click", () => {
// 			englishButtons[i].classList.remove("active");
// 			swedishButtons[i].classList.add("active");
// 			game.language = "sv";
// 		});
// 	}
// }

lengthSlider.addEventListener("input", () => {
	lengthValue.textContent = lengthSlider.value;
	game.wordLength = parseInt(lengthSlider.value);
});

addBackButtonListeners();
addPlayButtonListeners();
// addEnglishButtonListeners();
// addSwedishButtonListeners();