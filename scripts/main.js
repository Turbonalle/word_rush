import { LevelManager } from "./level_manager.js";
import { Save } from "./save.js";
import { audio } from "./audio.js";

const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");
const englishButtons = document.querySelectorAll("#option-en");
const swedishButtons = document.querySelectorAll("#option-sv");

export const game = {
	// State
	state: "menu",
	
	// Settings
	mode: "",
	language: "en",
	wordLength: 6,
	
	// Current level
	storyLevelId: 0,
	word: "",
	letterFrequency: {},
	possibleAnswers: [],
	
	// Player state
	currentInput: "",
	inputFrequency: {},
	wordsFound: [],

	// Save data
	save: {}
};

async function initializeGame() {
	game.save = Save.loadSave();
	await LevelManager.load();
	await LevelManager.loadBasicLevels();
}

export function getElement(id) {
	const completeId = game.mode + id;
	const element = document.getElementById(completeId);
	return element;
}

export function resetActiveButtons() {
	document.querySelectorAll(".mode-button").forEach(button => {
		button.classList.remove("active-button");
	});
}

function addEnglishButtonListeners() {
	for (let i = 0; i < englishButtons.length; i++) {
		englishButtons[i].addEventListener("click", () => {
			swedishButtons[i].classList.remove("active");
			englishButtons[i].classList.add("active");
			game.language = "sv";
		});
	}
}

function addSwedishButtonListeners() {
	for (let i = 0; i < swedishButtons.length; i++) {
		swedishButtons[i].addEventListener("click", () => {
			englishButtons[i].classList.remove("active");
			swedishButtons[i].classList.add("active");
			game.language = "sv";
		});
	}
}

lengthSlider.addEventListener("input", () => {
	lengthValue.textContent = lengthSlider.value;
	game.wordLength = parseInt(lengthSlider.value);
});

// audio.play("music");
window.addEventListener("DOMContentLoaded", initializeGame);
addEnglishButtonListeners();
addSwedishButtonListeners();
