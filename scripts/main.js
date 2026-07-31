import { startGame } from "./game.js";

const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
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

export function showGame() {
	menuScreen.classList.add("hidden");
	gameScreen.classList.remove("hidden");
}

export function showMenu() {
	menuScreen.classList.remove("hidden");
	gameScreen.classList.add("hidden");
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
	game.wordLength = lengthSlider.value;
});

addEnglishButtonListeners();
addSwedishButtonListeners();