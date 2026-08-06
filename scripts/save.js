const SAVE_KEY = "wordhunt-save";

const DEFAULT_SAVE = {
	version: 1,
	settings: {
		language: "en",
		music: true,
		sound: true
	},
	stats: {
		gamesPlayed: 0,
		wordsFound: 0
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
		localStorage.removeItem(this.SAVE_KEY);
	},

	addFoundWord(language, levelId, word) {
		if (!this.data.story[language][levelId]) {
			this.data.story[language][levelId] = {
				completed: false,
				wordsFound: []
			};
		}
		const level = this.data.story[language][levelId];
		if (!level.wordsFound.includes(word)) {
			level.wordsFound.push(word);
		}
		this.saveGame(this.data);
	},

	getFoundWordsAmount(language, levelId) {
		if (this.data.story[language][levelId]) {
			return this.data.story[language][levelId].wordsFound.length;
		} else {
			return 0;
		}
	}
};