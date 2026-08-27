const SAVE_KEY = "wordrush-save";

const DEFAULT_SAVE = {
	version: 1,
	settings: {
		language: "en",
		music: true,
		sound: true
	},
	stats: {
		// Overall
		gamesPlayed: 0,
		wordsFound: 0,
		starsCollected: 0,
		timesGivenUp: 0,
		averageWordPercentage: 0.0,
		// Modes
		dailyGamesStarted: 0,
		zenGamesStarted: 0,
		hardGamesStarted: 0,
		panicGamesStarted: 0,
		dailyGamesFinished: 0,
		zenGamesFinished: 0,
		hardGamesFinished: 0,
		panicGamesFinished: 0,
	},
	daily: {
		date: "",
		wordsFound: [],
		givenUp: false,
	},
	story: {
		en: {},
		sv: {}
	}
}

export const Save = {
	data: structuredClone(DEFAULT_SAVE),
	
	migrateSave() {
		// Save data version control
	},
	
	loadSave() {
		const json = localStorage.getItem(this.SAVE_KEY);
		if (!json) {
			this.data = structuredClone(DEFAULT_SAVE);
			this.saveGame();
			return;
		}
		this.data = JSON.parse(json);
		if (this.data.version !== DEFAULT_SAVE.version) {
			this.migrateSave();
		}
	},

	saveGame() {
		localStorage.setItem(this.SAVE_KEY, JSON.stringify(this.data));
	},

	resetSave() {
		console.log("Resetting save.");
		localStorage.removeItem(this.SAVE_KEY);
		localStorage.removeItem("undefined");
	},

	addFoundWord(language, chapter, levelId, word) {
		if (!this.data.story[language][chapter]) {
			this.data.story[language][chapter] = {};
		}
		if (!this.data.story[language][chapter][levelId]) {
			this.data.story[language][chapter][levelId] = {
				wordsFound: [],
				percentage: 0.0,
				stars: 0
			};
		}
		const level = this.data.story[language][chapter][levelId];
		if (!level.wordsFound.includes(word)) {
			level.wordsFound.push(word);
		}
		this.saveGame(this.data);
	},

	getFoundWordsAmount(language, chapter, levelId) {
		if (this.data.story[language][chapter]?.[levelId]) {
			return this.data.story[language][chapter][levelId].wordsFound.length;
		} else {
			return 0;
		}
	},

	getFoundWords(language, chapter, levelId) {
		if (this.data.story[language][chapter]?.[levelId]) {
			return this.data.story[language][chapter][levelId].wordsFound;
		} else {
			return [];
		}
	}
};