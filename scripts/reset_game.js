import { game } from "./main.js";
import { getElementByMode } from "./helper_functions.js";
import { Timer } from "./Timer.js";

function resetGameData() {
	game.word = [];
	game.letterFrequency = {};
	game.possibleAnswers = [];
	game.currentInput = "";
	game.inputFrequency = {};
	game.wordsFound = [];
	game.givenUp = false;
}

function resetGivenLettersContainer() {
	getElementByMode(game.mode, "-given-letters-container").textContent = "";
}

function resetCandidateWordContainer() {
	const candidateWordContainer = getElementByMode(game.mode, "-candidate-word-container");
	var children = candidateWordContainer.children;
	for (var i = children.length - 1; i >= 0; i--) {
		children[i].remove();
	}
}

function resetWordsFoundContainer() {
	const wordsFoundContainer = getElementByMode(game.mode, "-found-words-container");
	var children = wordsFoundContainer.children;
	for (var i = children.length - 1; i >= 0; i--) {
		children[i].remove();
	}
}

export function resetGame() {
	resetGameData();
	if (game.mode === "panic")
		Timer.stop();
	if (game.mode !== "test")
		resetGivenLettersContainer();
	resetCandidateWordContainer();
	resetWordsFoundContainer();
}