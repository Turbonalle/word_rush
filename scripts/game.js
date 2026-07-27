import { gameState, levels } from "./main.js";

const givenLettersContainer = document.getElementById("given-letters-container");
const candidateWordContainer = document.getElementById("candidate-word-container");

function resetGameState() {
	gameState.word = [];
	gameState.availableWords = [];
	gameState.wordsFound = [];
}

function resetContainers() {
	givenLettersContainer.textContent = "";
	var children = candidateWordContainer.children;
	console.log("We have " + children.length + " children");
	for (var i = children.length - 1; i >= 0; i--) {
		console.log("Removing child " + i);
		children[i].remove();
	}
}

function getLevel() {
	const possibleLevels = levels[gameState.language].filter(
		level => level.letters.length === gameState.wordLength
	);
	if (possibleLevels.length === 0) {
		return null;
	};
	const index = Math.floor(Math.random() * possibleLevels.length);
	gameState.word = possibleLevels[index].letters;
	gameState.availableWords = possibleLevels[index].answers;
	givenLettersContainer.textContent = gameState.word;
}

function setWord() {
	switch(gameState.mode) {
		case "basic":
			getLevel();
		default:
			getLevel();
	}
}

function createLetterBoxes() {
	for (let i = 0; i < gameState.wordLength; i++) {
		const typingLetterBox = document.createElement("div");
		typingLetterBox.classList.add("typing-letter-box");
		candidateWordContainer.append(typingLetterBox);
	}
}

export function startGame() {
	resetGameState();
	resetContainers();
	setWord();
	createLetterBoxes();

	console.log("Word is: " + gameState.word);
	console.log("Answers: " + gameState.availableWords);
}