import { startGame } from "./game.js";

const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const playButton = document.getElementById("play-button");
const backButton = document.getElementById("back-button");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");
const englishButton = document.getElementById("option-en");
const swedishButton = document.getElementById("option-sv");

export const game = {
	// State
	state: "menu",
	
	// Settings
	mode: "basic",
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
})

function showGame() {
	menuScreen.classList.add("hidden");
	gameScreen.classList.remove("hidden");
}

function showMenu() {
	menuScreen.classList.remove("hidden");
	gameScreen.classList.add("hidden");
}

englishButton.addEventListener("click", () => {
	swedishButton.classList.remove("active");
	englishButton.classList.add("active");
	game.language = "en";
});

swedishButton.addEventListener("click", () => {
	englishButton.classList.remove("active");
	swedishButton.classList.add("active");
	game.language = "sv";
});

playButton.addEventListener("click", () => {
	game.state = "game";
	startGame();
	showGame();
});

backButton.addEventListener("click", () => {
	game.state = "menu";
	showMenu();
});

lengthSlider.addEventListener("input", () => {
	lengthValue.textContent = lengthSlider.value;
	game.wordLength = lengthSlider.value;
});