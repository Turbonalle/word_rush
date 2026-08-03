const SAVE_KEY = "wordhunt-save";

const defaultSave = {
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
		en: {
			1: {
				completed: false,
				wordsFound: []
			},
		},
		sv: {
			1: {
				completed: false,
				wordsFound: []
			}
		}
	}
};

export const Save = {
	loadSave() {
		const json = localStorage.getItem(SAVE_KEY);
		if (!json) {
			return structuredClone(defaultSave);
		}
		return JSON.parse(json);
	},

	saveGame(saveData) {
		localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
	},

	resetSave() {
		localStorage.removeItem(SAVE_KEY);
	}
};