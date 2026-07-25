const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const playButton = document.getElementById("play-button");
const backButton = document.getElementById("back-button");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");

function showGame() {
	menuScreen.classList.add("hidden");
	gameScreen.classList.remove("hidden");
}

function showMenu() {
	menuScreen.classList.remove("hidden");
	gameScreen.classList.add("hidden");
}

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