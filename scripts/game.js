import { game } from "./main.js";
import { gameToMode, gameToSettings, hideWinningScreen, settingsToGame, showWinningScreen } from "./screen_switch.js";
import { resetGame } from "./reset_game.js";
import { getElement, calculateLetterFrequency } from "./helper_functions.js";
import { LevelManager } from "./LevelManager.js";
import { DictionaryManager } from "./DictionaryManager.js";
import { Save } from "./save.js";
import { StoryUIBuilder } from "./StoryUIBuilder.js";
import { Timer } from "./Timer.js";
import { UnlockManager } from "./UnlockManager.js";
import { ProgressManager } from "./ProgressManager.js";

export function updateLetterBoxes() {
	const boxes = document.querySelectorAll(".typing-letter-box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].textContent = game.currentInput[i]?.toUpperCase() ?? "";
	}
	const seen = {};
	for (let i = 0; i < game.currentInput.length; i++) {
		const letter = game.currentInput[i];
		seen[letter] = (seen[letter] || 0) + 1;
		if (game.mode !== "test" && seen[letter] > (game.letterFrequency[letter] || 0)) {
			boxes[i].classList.add("color-error");
		} else {
			boxes[i].classList.remove("color-error");
		}
	}
	if (game.currentInput.length < boxes.length) {
		boxes[game.currentInput.length].classList.remove("color-error");
	}
}

function resetLetterBoxes() {
	game.currentInput = "";
	game.inputFrequency = {};
	document.querySelectorAll(".typing-letter-box").forEach(box => {
		box.textContent = "";
		box.classList.remove("color-error");
	});
}

function resetProgressBar() {
	const progressText = getElement(game.mode, "-progress-text");
	const progressBar = getElement(game.mode, "-progress-bar");
	progressText.textContent = "0 / " + game.possibleAnswers.length;
	progressBar.style.width = "0%";
}

function createLetterBoxes(amount) {
	const container = getElement(game.mode, "-candidate-word-container");
	for (let i = 0; i < amount; i++) {
		const typingLetterBox = document.createElement("div");
		typingLetterBox.classList.add("typing-letter-box");
		container.append(typingLetterBox);
	}
}

function addFoundDailyWordsToContainer() {
	const foundWordsContainer = getElement(game.mode, "-found-words-container");
	const words = Save.getDailyWordsFound(game.language);
	for (let i = 0; i < words.length; i++) {
		const wordTag = document.createElement("div");
		wordTag.classList.add("word-tag");
		wordTag.textContent = words[i];
		foundWordsContainer.appendChild(wordTag);
	}
}

function copyDailyWordsToGameData() {
	const words = Save.getDailyWordsFound(game.language);
	game.wordsFound = [];
	for (let i = 0; i < words.length; i++) {
		game.wordsFound.push(words[i]);
	}
}

function getTodayString() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function isNewDaily() {
	const today = getTodayString();
	const daily = Save.getDailyDate(game.language);
	if (today === daily) {
		return false;
	}
	return true;
}

function addWordsToContainer(words) {
	const foundWordsContainer = getElement(game.mode, "-found-words-container");
	for (let i = 0; i < words.length; i++) {
		const wordTag = document.createElement("div");
		wordTag.classList.add("word-tag");
		wordTag.textContent = words[i];
		foundWordsContainer.appendChild(wordTag);
	}
}

function addWordToContainer(word) {
	// Add word to displaying container	
	const foundWordsContainer = getElement(game.mode, "-found-words-container");
	const wordTag = document.createElement("div");
	wordTag.classList.add("word-tag");
	wordTag.textContent = word;
	foundWordsContainer.appendChild(wordTag);
}

export function findAndFillWords() {
	const foundWordsContainer = getElement(game.mode, "-found-words-container");
	foundWordsContainer.replaceChildren();
	const possibleWords = DictionaryManager.findPossibleWords(game.currentInput, game.language);
	for (let i = 0; i < possibleWords.length; i++) {
		addWordToContainer(possibleWords[i]);
	}
	addWordToContainer(`${possibleWords.length} possible words!`);
	const container = getElement(game.mode, "-found-words-container");
	const resultTag = container.lastElementChild;
	resultTag.classList.add("color-correct");
}

function findAndFillRestWords() {
	const foundWordsContainer = getElement(game.mode, "-found-words-container");
	game.possibleAnswers.forEach(word => {
		if (!game.wordsFound.includes(word)) {
			const wordTag = document.createElement("div");
			wordTag.classList.add("word-tag");
			wordTag.classList.add("color-error");
			wordTag.textContent = word;
			foundWordsContainer.appendChild(wordTag);
		}
	});
}

function updateProgressUI() {
	// Calculate and set progress bar width
	const progressBar = getElement(game.mode, "-progress-bar");
	let progress = 0.0;
	if (game.wordsFound.length > 0)
		progress = game.wordsFound.length / game.possibleAnswers.length;
	progressBar.style.width = `${progress * 100}%`;

	// Set progress text
	const progressText = getElement(game.mode, "-progress-text");
	progressText.textContent = game.wordsFound.length + " / " + game.possibleAnswers.length;
}

function setLives(n) {
	document.getElementById("hard-lives-container").textContent = `${n}`;
}

function setupLevel(level) {
	game.word = level.letters;
	game.wordLength = level.letters.length;
	game.possibleAnswers = level.answers;
	game.letterFrequency = calculateLetterFrequency(level.letters);
	getElement(game.mode, "-given-letters-container").textContent = level.letters;
	createLetterBoxes(game.wordLength);
}

export function startGame() {
	resetGame();
	game.storedWordLength = game.wordLength;
	let level;
	switch(game.mode) {
		case "daily":
			if (isNewDaily()) {
				Save.increaseGamesPlayed();
				Save.increaseDailyGamesPlayed();
				Save.startNewDaily(game.language, getTodayString());
			}
			level = LevelManager.getDailyLevel(game.language);
			setupLevel(level);
			copyDailyWordsToGameData();
			addFoundDailyWordsToContainer();
			game.wordLength = 5;
			game.givenUp = Save.isDailyGivenUp(game.language);
			if (game.givenUp) {
				findAndFillRestWords();
			}
			updateProgressUI();
			settingsToGame("daily");
			break;
		case "story":
			Save.increaseGamesPlayed();
			Save.increaseStoryGamesPlayed();
			level = LevelManager.getStoryLevel(game.language, game.currentStoryChapter, game.storyLevelId);
			game.wordsFound = Save.getFoundWords(game.language, game.currentStoryChapter, game.storyLevelId);
			setupLevel(level);
			updateProgressUI();
			addWordsToContainer(game.wordsFound);
			settingsToGame("story");
			break;
		case "zen":
			Save.increaseGamesPlayed();
			Save.increaseZenGamesPlayed();
			level = LevelManager.getRandomLevel(game.language, game.wordLength);
			setupLevel(level);
			resetProgressBar();
			settingsToGame("zen");
			break;
		case "hard":
			Save.increaseGamesPlayed();
			Save.increaseHardGamesPlayed();
			level = LevelManager.getRandomLevel(game.language, game.wordLength);
			setupLevel(level);
			resetProgressBar();
			settingsToGame("hard");
			game.lives = 3;
			setLives(game.lives);
			break;
		case "panic":
			Save.increaseGamesPlayed();
			Save.increasePanicGamesPlayed();
			level = LevelManager.getRandomLevel(game.language, game.wordLength);
			setupLevel(level);
			resetProgressBar();
			settingsToGame("panic");
			Timer.start(60);
			break;
		case "test":
			game.wordLength = 18;
			createLetterBoxes(game.wordLength);
			settingsToGame("test");
			break;
		default:
			break;
	}
	Save.increaseTotalWordsToFind(level.answers.length);
	console.log("[startGame] Word is: " + game.word);
	console.log("[startGame] Answers: " + game.possibleAnswers);
}

export function submitWord() {
	if (game.givenUp)
		return;
	const word = game.currentInput;
	if (game.wordsFound.includes(word)) {
		console.log("You already have that word...");
		resetLetterBoxes();
		return;
	}
	if (game.possibleAnswers.includes(word)) {
		console.log("Correct!", word, "exists!");
		game.wordsFound.push(game.currentInput);
		updateProgressUI();
		addWordToContainer(game.currentInput);
		if (game.mode === "daily") {
			Save.addFoundDailyWord(game.language, game.currentInput);
		}
		if (game.mode === "story") {
			Save.addFoundStoryWord(game.language, game.currentStoryChapter, game.storyLevelId, game.currentInput);
		}
		if (game.mode === "panic") {
			Timer.add(10);
		}
		Save.increaseWordsFound();
	} else {
		console.log("Wrong!", word, "doesn't exist...");
		if (game.mode === "hard") {
			game.lives -= 1;
			setLives(game.lives);
			if (game.lives <= 0) {
				console.log("You lost!");
			}
		}
	}
	resetLetterBoxes();
	if (game.wordsFound.length === game.possibleAnswers.length) {
		// TODO: Handle winning visuals
		if (game.wordLength === 8) {
			ProgressManager.completeAchievement("finishedWordLength8");
		}
		Save.increaseGamesFinished();
		switch(game.mode) {
			case "daily":
				Save.increaseDailyGamesFinished();
				ProgressManager.completeAchievement("finishedDailyLevel");
				break;
			case "story":
				break;
			case "zen":
				Save.increaseZenGamesFinished();
				ProgressManager.completeAchievement("finishedZenLevel");
				break;
			case "hard":
				Save.increaseHardGamesFinished();
				ProgressManager.completeAchievement("finishedHardLevel");
				break;
			case "panic":
				Save.increasePanicGamesFinished();
				ProgressManager.completeAchievement("finishedPanicLevel");
				break;
		}
		showWinningScreen();
	}
}

document.querySelectorAll(".submit-button").forEach(button => {
	button.addEventListener("click", () => {
		submitWord();
	});
});

document.querySelectorAll(".to-mode-button").forEach(button => {
	button.addEventListener("click", () => {
		resetGame();
		gameToMode();
	});
});

document.querySelectorAll(".to-settings-button").forEach(button => {
	button.addEventListener("click", () => {
		resetGame();
		gameToSettings();
		if (game.mode === "story") {
			StoryUIBuilder.buildChapter(game.language, game.currentStoryChapter, levelId => {
				game.storyLevelId = levelId;
				startGame();
			});
		}
	});
});

document.querySelectorAll(".show-words-button").forEach(button => {
	button.addEventListener("click", () => {
		game.givenUp = true;
		if (game.mode === "daily") {
			Save.giveUpDaily(game.language);
		}
		Save.increaseTimesGivenUp();
		findAndFillRestWords();
	})
});

document.querySelectorAll(".new-game-button").forEach(button => {
	button.addEventListener("click", () => {
		hideWinningScreen();
		startGame();
	})
});

document.getElementById("test-get-answers-button").addEventListener("click", () => {
	findAndFillWords();
});

document.getElementById("next-level-button").addEventListener("click", () => {
	hideWinningScreen();
	// Get next level
	const next = LevelManager.getNextStoryLevelInfo(game.language, game.currentStoryChapter, game.storyLevelId);

	// Return if we can't play next level
	if (!next) {
		return;
	}
	if (!UnlockManager.isChapterUnlocked(game.language, next.chapterId)) {
		return;
	}

	// Prepare game data and start next level
	game.currentStoryChapter = next.chapterId;
	game.storyLevelId = next.id;
	startGame();
});