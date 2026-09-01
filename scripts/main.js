import { LevelManager } from "./LevelManager.js";
import { DictionaryManager } from "./DictionaryManager.js";
import { Save } from "./save.js";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer.js";
import { menuPlaylist } from "./AudioPlayer/playlists.js";

export const game = {
	// State
	state: "menu",
	
	// Settings
	mode: "",
	language: "en",
	wordLength: 4,
	storedWordLength: 4,
	
	// Current level
	currentStoryChapter: 1,
	storyLevelId: 0,
	word: "",
	letterFrequency: {},
	possibleAnswers: [],
	
	// Player state
	currentInput: "",
	inputFrequency: {},
	wordsFound: [],
	lives: 0,
	givenUp: false,

	// Save data
	save: {},

	// Timer
	timer: {
		duration: 0,
		timeRemaining: 0,
		endTime: null,
		intervalId: null,
		running: false
	}
};

async function initializeGame() {
	Save.loadSave();
	await LevelManager.loadDailyLevels();
	await LevelManager.loadStoryLevels();
	await LevelManager.loadBasicLevels();
	await DictionaryManager.loadDictionaries();
	AudioPlayer.init();
	AudioPlayer.loadPlaylist(menuPlaylist);
	console.log("Save:", Save.data);
}

window.addEventListener("DOMContentLoaded", initializeGame);