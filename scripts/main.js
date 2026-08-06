import { LevelManager } from "./level_manager.js";
import { Save } from "./save.js";
import { audio } from "./audio.js";

export const game = {
	// State
	state: "menu",
	
	// Settings
	mode: "",
	language: "en",
	wordLength: 6,
	
	// Current level
	storyLevelId: 0,
	word: "",
	letterFrequency: {},
	possibleAnswers: [],
	
	// Player state
	currentInput: "",
	inputFrequency: {},
	wordsFound: [],

	// Save data
	save: {}
};

async function initializeGame() {
	game.save = Save.loadSave();
	await LevelManager.load();
	await LevelManager.loadBasicLevels();
}

// audio.play("music");
window.addEventListener("DOMContentLoaded", initializeGame);