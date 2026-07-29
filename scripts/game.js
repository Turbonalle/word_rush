import { game, levels } from "./main.js";

const givenLettersContainer = document.getElementById("given-letters-container");
const candidateWordContainer = document.getElementById("candidate-word-container");
const submitButton = document.getElementById("submit-button");

export function updateLetterBoxes() {
	const boxes = document.querySelectorAll(".typing-letter-box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].textContent = game.currentInput[i]?.toUpperCase() ?? "";
	}
	const seen = {};
	for (let i = 0; i < game.currentInput.length; i++) {
		const letter = game.currentInput[i];
		seen[letter] = (seen[letter] || 0) + 1;
		if (seen[letter] > (game.letterFrequency[letter] || 0)) {
			boxes[i].classList.add("invalid-character");
		} else {
			boxes[i].classList.remove("invalid-character");
		}
	}
	if (game.currentInput.length < boxes.length) {
		boxes[game.currentInput.length].classList.remove("invalid-character");
	}
}

function resetLetterBoxes() {
	game.currentInput = "";
	game.inputFrequency = {};
	const boxes = document.querySelectorAll(".typing-letter-box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].textContent = "";
		boxes[i].classList.remove("invalid-character");
	}
}

function resetgame() {
	game.word = [];
	game.letterFrequency = {};
	game.possibleAnswers = [];
	game.currentInput = "";
	game.inputFrequency = {};
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

export function calculateLetterFrequency(word) {
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
	game.possibleAnswers = possibleLevels[randomIndex].answers;
}

function setWord() {
	switch(game.mode) {
		case "basic":
			getLevel();
			break;
		default:
			getLevel();
			break;
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

	console.log("[startGame] Word is: " + game.word);
	console.log("[startGame] Answers: " + game.possibleAnswers);
}

export function submitWord() {
	const word = game.currentInput;
	if (game.wordsFound.includes(word)) {
		console.log("You already have that word...");
		resetLetterBoxes();
		return;
	}
	if (game.possibleAnswers.includes(word)) {
		console.log("Correct!", word, "exists!");
		game.wordsFound.push(word);
	} else {
		console.log("Wrong!", word, "doesn't exist...");
	}
	resetLetterBoxes();
}

submitButton.addEventListener("click", () => {
	submitWord();
});