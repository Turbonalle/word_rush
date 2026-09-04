import { ProgressManager } from "./ProgressManager.js";

export const UnlockManager = {
	modes: {
		zen: {
			requirement: {
				type: "stars",
				amount: 10
			}
		},
		hard: {
			requirement: {
				type: "stars",
				amount: 20
			}
		},
		panic: {
			requirement: {
				type: "stars",
				amount: 30
			}
		},
	},
	songs: {
		song1: {
			requirement: null
		},
		song2: {
			requirement: {
				type: "achievement",
				id: "finishedDailyLevel"
			}
		},
		song3: {
			requirement: {
				type: "achievement",
				id: "finishedZenLevel"
			}
		},
		song4: {
			requirement: {
				type: "achievement",
				id: "finishedHardLevel"
			}
		},
		song5: {
			requirement: {
				type: "achievement",
				id: "finishedPanicLevel"
			}
		},
		song6: {
			requirement: {
				type: "achievement",
				id: "finishedWordLength8"
			}
		},
		song8: {
			requirement: {
				type: "words",
				amount: 100
			}
		}
	},
	chapters: {
		en: {
			"1": { requirement: 0, },
			"2": { requirement: 10, },
			"3": { requirement: 20, }
		},
		sv: {
			"1": { requirement: 0, },
			"2": { requirement: 10, },
			"3": { requirement: 20, }
		}
	},

	getChapterRequirement(language, chapterId) {
		return this.chapters[language][chapterId].requirement;
	},

	isChapterUnlocked(language, chapterId) {
		const chapter = this.chapters[language][chapterId];
		if (!chapter) {
			console.log("Chapter:", language, chapterId, "does not exist.");
			return false;
		}
		const totalStars = ProgressManager.getTotalStarsAcquired(language);
		console.log("stars:", totalStars);
		console.log("requirement:", chapter.requirement);
		if (totalStars >= chapter.requirement) {
			console.log("Chapter:", language, chapterId, "is unlocked.");
			return true;
		}
		console.log("Chapter:", language, chapterId, "is locked.");
		return false;
	},

	isSongUnlocked(id) {
		const song = this.songs[id];
		if (!song) {
			console.log("Song:", id, "does not exist.");
			return false;
		}
		const requirement = song.requirement;
		if (!requirement) {
			return true;
		}
		if (requirement.type === "stars") {
			const totalStars = ProgressManager.getMostStarsPerLanguage();
			return totalStars >= requirement.amount;
		}
		if (requirement.type === "words") {
			const totalWords = ProgressManager.getWordsFound();
			return totalWords >= requirement.amount;
		}
		if (requirement.type === "achievement") {
			return ProgressManager.isAchievementUnlocked(id);
		}
		return false;
	},

	isModeUnlocked(mode) {
		if (!this.modes[mode]) {
			console.log("Mode", mode, "does not exist.");
			return false;
		}
		const requirement = this.modes[mode].requirement;
		if (requirement.type === "stars") {
			const starsCollected = ProgressManager.getMostStarsPerLanguage();
			return starsCollected >= requirement.amount;
		}
		return false;
	}
};