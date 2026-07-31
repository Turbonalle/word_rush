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
const modeInfoContainer = document.getElementById("mode-info-container");

const modeDescriptions = {
	story: "Play through increasingly difficult handcrafted levels.",
	basic: "Get a random word and find as many words as possible.",
	panic: "Beat the clock before time runs out.",
	test: "Write a word and see which words can be created from it."
};

function hideModesMenu() {
	modesContainer.classList.add("hidden");
}

function showModesMenu() {
	modesContainer.classList.remove("hidden");
}

function resetActiveButtons() {
	const modeButtons = document.querySelectorAll(".mode-button");
	for (let i = 0; i < modeButtons.length; i++) {
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
			game.state = "game";
			startGame();
			showGame();
		});
	}
}

addBackButtonListeners();
addPlayButtonListeners();

document.getElementById("story-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.story;
});

document.getElementById("basic-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.basic;
});

document.getElementById("panic-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.panic;
});

document.getElementById("test-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.test;
});

document.querySelectorAll(".mode-button").forEach(button => {
	button.addEventListener("mouseleave", () => {
		modeInfoContainer.textContent = "";
	})
})