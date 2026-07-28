import { game, levels } from "./main.js";

const givenLettersContainer = document.getElementById("given-letters-container");
const candidateWordContainer = document.getElementById("candidate-word-container");

function resetgame() {
	game.word = [];
	game.possibleAnswers = [];
	game.wordsFound = [];
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

function calculateLetterFrequency(word) {
	const frequency = {};
	for (const letter of word) {
		if (frequency[letter]) {
			frequency[letter]++;
		} else {
			frequency[letter] = 1;
		}
	}
	return frequency;
}

function getLevel() {
	const possibleLevels = levels[game.language].filter(
		level => level.letters.length === game.wordLength
	);
	if (possibleLevels.length === 0) {
		return null;
	};
	const randomIndex = Math.floor(Math.random() * possibleLevels.length);
	game.word = possibleLevels[randomIndex].letters;
	game.letterFrequency = calculateLetterFrequency(game.word);
	game.possibleAnswers = possibleLevels[index].answers;
}

function setWord() {
	switch(game.mode) {
		case "basic":
			getLevel();
		default:
			getLevel();
	}
}

function createLetterBoxes() {
	for (let i = 0; i < game.wordLength; i++) {
		const typingLetterBox = document.createElement("div");
		typingLetterBox.classList.add("typing-letter-box");
		candidateWordContainer.append(typingLetterBox);
	}
}

export function startGame() {
	resetgame();
	resetContainers();
	setWord();
	createLetterBoxes();
	givenLettersContainer.textContent = game.word;

	console.log("Word is: " + game.word);
	console.log("Answers: " + game.possibleAnswers);
}

export function submitWord() {
	
}