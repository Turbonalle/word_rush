const starRequirements = {
	"1": 0.25,
	"2": 0.5,
	"3": 1.0
};

export const UnlockManager = {
	achievements: {
		fullStarStoryLevel: false,
		unlockChapter2: false,
		finishedBasicLevel: false,
		finishedPanicLevel: false,
		found100Words: false,
		collected100Stars: false
	},
	chapters: {
		en: {
			"1": {
				requirement: 0,
				unlocked: false
			},
			"2": {
				requirement: 10,
				unlocked: false
			},
			"3": {
				requirement: 20,
				unlocked: false
			}
		},
		sv: {
			"1": {
				requirement: 0,
				unlocked: false
			},
			"2": {
				requirement: 10,
				unlocked: false
			},
			"3": {
				requirement: 20,
				unlocked: false
			}
		}
	},

	getChapterRequirement(language, chapterId) {
		return this.chapters[language][chapterId].requirement;
	},

	isChapterUnlocked(language, chapterId) {
		return this.chapters[language][chapterId].unlocked;
	},

	checkProgression() {

	}
};