import { game } from "./main.js";
import { getElement } from "./helper_functions.js";

function resetGameData() {
	game.word = [];
	game.letterFrequency = {};
	game.possibleAnswers = [];
	game.currentInput = "";
	game.inputFrequency = {};
	game.wordsFound = [];
}

function resetGivenLettersContainer() {
	getElement("-given-letters-container").textContent = "";
}

function resetCandidateWordContainer() {
	const candidateWordContainer = getElement("-candidate-word-container");
	var children = candidateWordContainer.children;
	for (var i = children.length - 1; i >= 0; i--) {
		children[i].remove();
	}
}

function resetWordsFoundContainer() {
	const wordsFoundContainer = getElement("-found-words-container");
	var children = wordsFoundContainer.children;
	for (var i = children.length - 1; i >= 0; i--) {
		children[i].remove();
	}
}

export function resetGame() {
	resetGameData();
	resetGivenLettersContainer();
	resetCandidateWordContainer();
	resetWordsFoundContainer();
}