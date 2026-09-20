import { LevelManager } from "./LevelManager.js";
import { DictionaryManager } from "./DictionaryManager.js";
import { Save } from "./Save.js";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer.js";
import { menuPlaylist } from "./AudioPlayer/playlists.js";
import { handleLockedModes } from "./screen_switch.js";
import { UnlockNotificationManager } from "./UnlockNotificationManager.js";
import { CueManager } from "./CueManager.js";
import { Timer } from "./Timer.js";

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
	gameOver: false,
	givenUp: false,
	typingLock: false,

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
	handleLockedModes();
	UnlockNotificationManager.init();
	CueManager.update();
	Timer.init();
	console.log("Save:", Save.data);
}

window.addEventListener("DOMContentLoaded", initializeGame);