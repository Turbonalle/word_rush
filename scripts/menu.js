import { game } from "./main.js";
import { LevelManager } from "./LevelManager.js";
import { modeToSettings, settingsToGame, settingsToMode } from "./screen_switch.js";
import { startGame } from "./game.js";
import { getElement } from "./helper_functions.js";

const storyModeButton = document.getElementById("story-mode-button");
const basicModeButton = document.getElementById("basic-mode-button");
const panicModeButton = document.getElementById("panic-mode-button");
const testModeButton = document.getElementById("test-mode-button");

storyModeButton.addEventListener("click", () => {
	game.mode = "story";
	modeToSettings();
	LevelManager.buildChapter(game.language, game.currentStoryChapter, levelId => {
		game.storyLevelId = levelId;
		startGame();
	});
});

basicModeButton.addEventListener("click", () => {
	game.mode = "basic";
	modeToSettings();
});

panicModeButton.addEventListener("click", () => {
	game.mode = "panic";
	modeToSettings();
});

testModeButton.addEventListener("click", () => {
	game.mode = "test";
	modeToSettings();
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

function setActiveChapterButton(chapterId) {
	// Get buttons and index
	const chapterButtons = document.querySelectorAll(".chapter-button");
	const buttonIndex = chapterId - 1;

	// Check index validity
	if (buttonIndex < 0) {
		console.log("Error: chapter button index is a negative number.");
		return;
	}
	if (buttonIndex >= chapterButtons.length) {
		console.log("Error: chapter button index is too big.");
		return;
	}

	// Remove active class from every chapter button
	chapterButtons.forEach(button => {
		button.classList.remove("active");
	})

	// Use index to add class to chapter button
	chapterButtons[buttonIndex].classList.add("active");
}

export function setChapter(chapterId) {
	game.currentStoryChapter = chapterId;
	setActiveChapterButton(chapterId);
	LevelManager.buildChapter(game.language, chapterId, levelId => {
		game.storyLevelId = levelId;
		startGame();
	});
}

document.querySelectorAll(".chapter-button").forEach(button => {
	button.addEventListener("click", event => {
		const chapterId = Number(event.currentTarget.dataset.chapter);
		setChapter(chapterId);
	});
});