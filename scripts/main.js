import { LevelManager } from "./LevelManager.js";
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
	await LevelManager.loadStoryLevels();
	await LevelManager.loadBasicLevels();
	AudioPlayer.init();
	AudioPlayer.loadPlaylist(menuPlaylist);
}

window.addEventListener("DOMContentLoaded", initializeGame);