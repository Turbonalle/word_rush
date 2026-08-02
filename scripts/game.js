import { game, levels, getElement } from "./main.js";
import { gameToMode } from "./screen_switch.js";

import { resetGame } from "./reset_game.js";

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
	document.querySelectorAll(".typing-letter-box").forEach(box => {
		box.textContent = "";
		box.classList.remove("invalid-character");
	});
}

function resetProgressBar() {
	const progressText = getElement("-progress-text");
	const progressBar = getElement("-progress-bar");
	progressText.textContent = "0 / " + game.possibleAnswers.length;
	progressBar.style.width = "0%";
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

function getRandomLevel() {
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

function createLetterBoxes(amount) {
	const container = getElement("-candidate-word-container");
	for (let i = 0; i < amount; i++) {
		const typingLetterBox = document.createElement("div");
		typingLetterBox.classList.add("typing-letter-box");
		container.append(typingLetterBox);
	}
}

function showGame() {
	const gameScreens = document.querySelectorAll(".game-screen");
	for (let i = 0; i < gameScreens.length; i++) {
		gameScreens[i].classList.add("hidden");
	}
	const gameScreen = getElement("-game-screen");
	gameScreen.classList.remove("hidden");
}

export function startGame() {
	console.log(game);
	resetGame();
	switch(game.mode) {
		case "story":
			break;
		case "basic":
			// resetContainers();
			getRandomLevel();
			const givenLettersContainer = getElement("-given-letters-container");
			givenLettersContainer.textContent = game.word;
			resetProgressBar();
			createLetterBoxes(game.wordLength);
			showGame();
			break;
		case "panic":
			break;
		case "test":
			createLetterBoxes(12);
			showGame();
			break;
		default:
			// resetContainers();
			getRandomLevel();
			resetProgressBar();
			createLetterBoxes(game.wordLength);
			showGame();
			break;
	}
	// givenLettersContainer.textContent = game.word;

	console.log("[startGame] Word is: " + game.word);
	console.log("[startGame] Answers: " + game.possibleAnswers);
}

function updateProgress() {
	// Add word to list
	game.wordsFound.push(game.currentInput);

	// Calculate and set progress bar width
	const progressBar = getElement("-progress-bar");
	let progress = 0.0;
	if (game.wordsFound.length > 0)
		progress = game.wordsFound.length / game.possibleAnswers.length;
	progressBar.style.width = `${progress * 100}%`;

	// Set progress text
	const progressText = getElement("-progress-text");
	progressText.textContent = game.wordsFound.length + " / " + game.possibleAnswers.length;

	// Add word to displaying container	
	const foundWordsContainer = getElement("-found-words-container");
	const wordTag = document.createElement("div");
	wordTag.classList.add("word-tag");
	wordTag.textContent = game.currentInput;
	foundWordsContainer.appendChild(wordTag);
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
		updateProgress();
	} else {
		console.log("Wrong!", word, "doesn't exist...");
	}
	resetLetterBoxes();
}

document.querySelectorAll(".backtomenu-button").forEach(button => {
	button.addEventListener("click", () => {
		resetGame();
		gameToMode();
	});
});