import { game } from "./main.js";
import { LevelManager } from "./level_manager.js";
import { settingsToGame } from "./screen_switch.js";
import { startGame } from "./game.js";

const modesContainer = document.getElementById("modes-container");
const storyModeButton = document.getElementById("story-mode-button");
const basicModeButton = document.getElementById("basic-mode-button");
const panicModeButton = document.getElementById("panic-mode-button");
const testModeButton = document.getElementById("test-mode-button");
const playButtons = document.querySelectorAll(".play-button");
const backButtons = document.querySelectorAll(".back-button");

function hideModesMenu() {
	modesContainer.classList.add("hidden");
}

function showModesMenu() {
	modesContainer.classList.remove("hidden");
}

function resetActiveButtons() {
	document.querySelectorAll(".mode-button").forEach(button => {
		button.classList.remove("active-button");
	});
}

function hideSettingsContainers() {
	document.querySelectorAll(".settings-container").forEach(container => {
		container.classList.add("hidden");
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
	for (let i = 0; i < backButtons.length; i++) {
		backButtons[i].addEventListener("click", () => {
			game.mode = "menu";
			resetActiveButtons();
			hideSettingsContainers();
			showModesMenu();
		});
	}
}

function addPlayButtonListeners() {
	for (let i = 0; i < playButtons.length; i++) {
		playButtons[i].addEventListener("click", () => {
			settingsToGame(game.mode);
			startGame();
		});
	}
}

addBackButtonListeners();
addPlayButtonListeners();