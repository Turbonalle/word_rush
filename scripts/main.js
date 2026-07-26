const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const playButton = document.getElementById("play-button");
const backButton = document.getElementById("back-button");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");
const englishButton = document.getElementById("option-en");
const swedishButton = document.getElementById("option-sv");

const gameState = {
	screen: "menu",
	language: "en",
	letters: 6,
	word: "",
	availableWords: [],
	wordsFound: []
};

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
	gameState.language = "en";
});

swedishButton.addEventListener("click", () => {
	englishButton.classList.remove("active");
	swedishButton.classList.add("active");
	gameState.language = "sv";
});

playButton.addEventListener("click", () => {
	// startGame(options);
	showGame();
});

backButton.addEventListener("click", () => {
	showMenu();
});

lengthSlider.addEventListener("input", () => {
	lengthValue.textContent = lengthSlider.value;
});