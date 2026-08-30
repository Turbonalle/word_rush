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
		gamesFinished: 0,
		finishRatio: 0.0,
		timesGivenUp: 0,
		// Stars and words
		wordsFound: 0,
		totalWordsToFind: 0,
		starsCollected: 0,
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
		en: {
			date: "",
			wordsFound: [],
			givenUp: false,
		},
		sv: {
			date: "",
			wordsFound: [],
			givenUp: false,
		}
	},
	story: {
		en: {},
		sv: {}
	},
	achievements: {
		finishedDailyLevel: false,
		finishedZenLevel: false,
		finishedHardLevel: false,
		finishedPanicLevel: false,
		finishedWordLength8: false
	}
}

export const Save = {
	data: structuredClone(DEFAULT_SAVE),

	// ---- Save handling ------------------------------------------------------

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
		localStorage.removeItem("undefined");
		// this.saveGame(this.data);
	},


	// ---- Level updates ------------------------------------------------------

	addFoundDailyWord(language, word) {
		if (!this.data.daily[language]) {
			console.log("Unknown language:", language);
			return;
		}
		this.data.daily[language].wordsFound.push(word);
		this.saveGame(this.data);
	},

	addFoundStoryWord(language, chapter, levelId, word) {
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


	// ---- Getters ------------------------------------------------------------

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
	},

	getDailyWordsFound(language) {
		return this.data.daily[language].wordsFound;
	},

	getDailyDate(language) {
		return this.data.daily[language].date;
	},

	isDailyGivenUp(language) {
		return this.data.daily[language].givenUp;
	},

	isAchievementUnlocked(id) {
		return this.achievements[id];
	},


	// ---- Stat updates -------------------------------------------------------

	increaseGamesPlayed() {
		this.data.stats.gamesPlayed += 1;
		this.saveGame(this.data);
	},

	increaseGamesFinished() {
		this.data.stats.gamesFinished += 1;
		this.saveGame(this.data);
	},

	increaseWordsFound() {
		this.data.stats.wordsFound += 1;
		this.saveGame(this.data);
	},

	increaseTotalWordsToFind(amount) {
		this.data.stats.totalWordsToFind += amount;
		this.saveGame(this.data);
	},

	increaseDailyGamesPlayed() {
		this.data.stats.dailyGamesStarted += 1;
		this.saveGame(this.data);
	},

	increaseStoryGamesPlayed() {
		this.data.stats.storyGamesStarted += 1;
		this.saveGame(this.data);
	},

	increaseZenGamesPlayed() {
		this.data.stats.zenGamesStarted += 1;
		this.saveGame(this.data);
	},

	increaseHardGamesPlayed() {
		this.data.stats.hardGamesStarted += 1;
		this.saveGame(this.data);
	},

	increasePanicGamesPlayed() {
		this.data.stats.panicGamesStarted += 1;
		this.saveGame(this.data);
	},

	increaseDailyGamesFinished() {
		this.data.stats.dailyGamesFinished += 1;
		this.saveGame(this.data);
	},

	increaseZenGamesFinished() {
		this.data.stats.zenGamesFinished += 1;
		this.saveGame(this.data);
	},

	increaseHardGamesFinished() {
		this.data.stats.hardGamesFinished += 1;
		this.saveGame(this.data);
	},

	increasePanicGamesFinished() {
		this.data.stats.panicGamesFinished += 1;
		this.saveGame(this.data);
	},

	increaseTimesGivenUp() {
		this.data.stats.timesGivenUp += 1;
		this.saveGame(this.data);
	},

	startNewDaily(language, date) {
		this.data.daily[language] = {
			date: date,
			wordsFound: [],
			givenUp: false
		};
		this.saveGame(this.data);
	},

	giveUpDaily(language) {
		this.data.daily[language].givenUp = true;
		this.saveGame(this.data);
	},


	// ---- Stat getters -------------------------------------------------------

	getGamesPlayed() { return this.data.stats.gamesPlayed; },
	getGamesFinished() { return this.data.stats.gamesFinished; },
	getTimesGivenUp() { return this.data.stats.timesGivenUp; },
	getWordsFound() { return this.data.stats.wordsFound; },
	getDailyGamesPlayed() { return this.data.stats.dailyGamesStarted; },
	getStoryGamesPlayed() { return this.data.stats.storyGamesStarted; },
	getZenGamesPlayed() { return this.data.stats.zenGamesStarted; },
	getHardGamesPlayed() { return this.data.stats.hardGamesStarted; },
	getPanicGamesPlayed() { return this.data.stats.panicGamesStarted; },
	getDailyGamesFinished() { return this.data.stats.dailyGamesFinished; },
	getStoryGamesFinished() { return this.data.stats.storyGamesFinished; },
	getZenGamesFinished() { return this.data.stats.zenGamesFinished; },
	getHardGamesFinished() { return this.data.stats.hardGamesFinished; },
	getPanicGamesFinished() { return this.data.stats.panicGamesFinished; },
	getFinishRatio() {
		let ratio = 0.0;
		if (this.data.stats.gamesPlayed !== 0)
			ratio = (this.data.stats.gamesFinished * 100) / this.data.stats.gamesPlayed;
		const fixedRatio = ratio.toFixed(1);
		return fixedRatio;
	},
	getAvgWordRatio() {
		let ratio = 0.0;
		if (this.data.stats.totalWordsToFind !== 0)
			ratio = (this.data.stats.wordsFound * 100) / this.data.stats.totalWordsToFind;
		const fixedRatio = ratio.toFixed(1);
		return fixedRatio;
	},
};