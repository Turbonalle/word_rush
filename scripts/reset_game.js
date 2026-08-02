import { game, getElement, } from "./main.js";

function resetGameData() {
	game.word = [];
	game.letterFrequency = {};
	game.possibleAnswers = [];
	game.currentInput = "";
	game.inputFrequency = {};
	game.wordsFound = [];
}

function resetGivenLettersContainer() {
	const givenLettersContainer = getElement("-given-letters-container");
	givenLettersContainer.textContent = "";
}

function resetCandidateWordContainer() {
	const candidateWordContainer = getElement("-candidate-word-container");
	var children = candidateWordContainer.children;
	for (var i = children.length - 1; i >= 0; i--) {
		children[i].remove();
	}
}

export function resetGame() {
	resetGameData();
	resetGivenLettersContainer();
	resetCandidateWordContainer();
}