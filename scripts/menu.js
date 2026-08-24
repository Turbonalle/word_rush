import { game } from "./main.js";
import { StoryUIBuilder } from "./StoryUIBuilder.js";
import { modeToSettings, settingsToGame, settingsToMode } from "./screen_switch.js";
import { startGame } from "./game.js";
import { getElement } from "./helper_functions.js";

const dailyModeButton = document.getElementById("daily-mode-button");
const storyModeButton = document.getElementById("story-mode-button");
const zenModeButton = document.getElementById("zen-mode-button");
const hardModeButton = document.getElementById("hard-mode-button");
const panicModeButton = document.getElementById("panic-mode-button");
const testModeButton = document.getElementById("test-mode-button");

export function updateSettingsUI() {
	document.querySelectorAll(".language-button").forEach(button => {
		if (game.language === button.dataset.language) {
			button.classList.add("active");
		} else {
			button.classList.remove("active");
		}
	});

	// Don't update sliders if we're in test mode. Test mode has automatically a big word length, which would make sliders out of bounds.
	if (game.mode === "test") {
		return;
	}

	document.querySelectorAll(".length-slider").forEach(slider => {
		slider.value = game.wordLength;
	});

	document.querySelectorAll(".length-value").forEach(text => {
		text.textContent = game.wordLength;
	});
}

dailyModeButton.addEventListener("click", () => {
	game.mode = "daily";
	updateSettingsUI();
	modeToSettings();
});

storyModeButton.addEventListener("click", () => {
	game.mode = "story";
	updateSettingsUI();
	modeToSettings();
	StoryUIBuilder.buildChapter(game.language, game.currentStoryChapter, levelId => {
		game.storyLevelId = levelId;
		startGame();
	});
});

zenModeButton.addEventListener("click", () => {
	game.mode = "zen";
	updateSettingsUI();
	modeToSettings();
});

hardModeButton.addEventListener("click", () => {
	game.mode = "hard";
	updateSettingsUI();
	modeToSettings();
});

panicModeButton.addEventListener("click", () => {
	game.mode = "panic";
	updateSettingsUI();
	modeToSettings();
});

testModeButton.addEventListener("click", () => {
	game.mode = "test";
	updateSettingsUI();
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
		updateSettingsUI();
	});
}

addBackButtonListeners();
addPlayButtonListeners();
setLengthSlider("zen");
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
	StoryUIBuilder.buildChapter(game.language, chapterId, levelId => {
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