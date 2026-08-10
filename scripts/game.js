import { game } from "./main.js";
import { gameToMode, settingsToGame } from "./screen_switch.js";
import { resetGame } from "./reset_game.js";
import { getElement } from "./helper_functions.js";
import { LevelManager } from "./LevelManager.js";
import { Save } from "./save.js";
import { Timer } from "./Timer.js";

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

function createLetterBoxes(amount) {
	const container = getElement("-candidate-word-container");
	for (let i = 0; i < amount; i++) {
		const typingLetterBox = document.createElement("div");
		typingLetterBox.classList.add("typing-letter-box");
		container.append(typingLetterBox);
	}
}

function addWordsToContainer(words) {
	const foundWordsContainer = getElement("-found-words-container");
	for (let i = 0; i < words.length; i++) {
		const wordTag = document.createElement("div");
		wordTag.classList.add("word-tag");
		wordTag.textContent = words[i];
		foundWordsContainer.appendChild(wordTag);
	}
}

function addWordToContainer(word) {
	// Add word to displaying container	
	const foundWordsContainer = getElement("-found-words-container");
	const wordTag = document.createElement("div");
	wordTag.classList.add("word-tag");
	wordTag.textContent = word;
	foundWordsContainer.appendChild(wordTag);
}

function updateProgress() {
	// Calculate and set progress bar width
	const progressBar = getElement("-progress-bar");
	let progress = 0.0;
	if (game.wordsFound.length > 0)
		progress = game.wordsFound.length / game.possibleAnswers.length;
	progressBar.style.width = `${progress * 100}%`;

	// Set progress text
	const progressText = getElement("-progress-text");
	progressText.textContent = game.wordsFound.length + " / " + game.possibleAnswers.length;
}

function setupLevel(level) {
	game.word = level.letters;
	game.wordLength = level.letters.length;
	game.possibleAnswers = level.answers;
	game.letterFrequency = calculateLetterFrequency(level.letters);
	getElement("-given-letters-container").textContent = level.letters;
	createLetterBoxes(game.wordLength);
}

export function startGame() {
	console.log(game);
	resetGame();
	let level;
	switch(game.mode) {
		case "story":
			level = LevelManager.getStoryLevel(game.language, game.storyLevelId);
			game.wordsFound = Save.getFoundWords(game.language, game.storyLevelId);
			setupLevel(level);
			updateProgress();
			addWordsToContainer(game.wordsFound);
			settingsToGame("story");
			break;
		case "basic":
			level = LevelManager.getRandomLevel(game.language, game.wordLength);
			setupLevel(level);
			resetProgressBar();
			settingsToGame("basic");
			break;
		case "panic":
			level = LevelManager.getRandomLevel(game.language, game.wordLength);
			setupLevel(level);
			resetProgressBar();
			settingsToGame("panic");
			Timer.start(60);
			break;
		case "test":
			createLetterBoxes(12);
			settingsToGame("test");
			break;
		default:
			break;
	}
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
		game.wordsFound.push(game.currentInput);
		updateProgress();
		addWordToContainer(game.currentInput);
		Save.addFoundWord(game.language, game.storyLevelId, game.currentInput);
		if (game.mode === "panic") {
			Timer.add(10);
		}
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

document.querySelectorAll(".submit-button").forEach(button => {
	button.addEventListener("click", () => {
		submitWord();
	});
});