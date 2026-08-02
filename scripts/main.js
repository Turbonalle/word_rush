const menuScreen = document.getElementById("menu-screen");
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
	word: "",
	letterFrequency: {},
	possibleAnswers: [],
	
	// Player state
	currentInput: "",
	inputFrequency: {},
	wordsFound: []
};

export const levels = {
	en: [],
	sv: []
};

async function loadLevels() {
	const response_en = await fetch("data/levels_en.json");
	levels.en = await response_en.json();
	console.log(`Loaded ${levels.en.length} levels.`);
	const response_sv = await fetch("data/levels_sv.json");
	levels.sv = await response_sv.json();
	console.log(`Loaded ${levels.sv.length} levels.`);
}

window.addEventListener("DOMContentLoaded", async () => {
	await loadLevels();
});

export function getElement(id) {
	const completeId = game.mode + id;
	const element = document.getElementById(completeId);
	return element;
}

function resetActiveButtons() {
	document.querySelectorAll(".mode-button").forEach(button => {
		button.classList.remove("active-button");
	});
}

export function modeToSettings() {
	document.getElementById("modes-container").classList.add("hidden");
	getElement("-settings-container").classList.remove("hidden");
}

export function settingsToGame(mode) {
	game.state = "game";
	game.mode = mode;
	document.getElementById("menu-screen").classList.add("hidden");
	getElement("-settings-container").classList.add("hidden");
	getElement("-game-screen").classList.remove("hidden");
	resetActiveButtons();
}

export function settingsToMode() {
	getElement("-settings-container").classList.add("hidden");
	document.getElementById("modes-container").classList.remove("hidden");
	game.mode = "";
	resetActiveButtons();
}

export function gameToMode() {
	getElement("-game-screen").classList.add("hidden");
	document.getElementById("menu-screen").classList.remove("hidden");
	document.getElementById("modes-container").classList.remove("hidden");
	game.state = "menu";
	game.mode = "";
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

addEnglishButtonListeners();
addSwedishButtonListeners();