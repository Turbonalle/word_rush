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
				amount: 30
			}
		},
		panic: {
			requirement: {
				type: "stars",
				amount: 50
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
				id: "finishedWordLength10"
			}
		},
		song8: {
			requirement: {
				type: "words",
				amount: 1000
			}
		},
		song9: {
			requirement: {
				type: "achievement",
				id: "finishedStoryMode"
			}
		}
	},
	chapters: {
		en: {
			"1": { requirement: 0, },
			"2": { requirement: 10, },
			"3": { requirement: 30, },
			"4": { requirement: 50, },
			"5": { requirement: 75, },
			"6": { requirement: 100, }
		},
		sv: {
			"1": { requirement: 0, },
			"2": { requirement: 10, },
			"3": { requirement: 30, },
			"4": { requirement: 50, },
			"5": { requirement: 75, },
			"6": { requirement: 100, }
		}
	},
	achievements: {
		collect10Stars: {
			title: "ADVENTURER",
			message: "Collect 10 stars."
		},
		collect30Stars: {
			title: "JOURNEYMAN",
			message: "Collect 30 stars."
		},
		collect50Stars: {
			title: "SEASONED VETERAN",
			message: "Collect 50 stars."
		},
		finishedDailyLevel: {
			title: "DAILY BEGINNER",
			message: "Finish a game in Daily mode."
		},
		finishedZenLevel: {
			title: "ZEN APPRENTICE",
			message: "Finish a game in Zen mode."
		},
		finishedHardLevel: {
			title: "HARDCORE",
			message: "Finish a game in Hard mode."
		},
		finishedPanicLevel: {
			title: "KEEPING IT TOGETHER",
			message: "Finish a game in Panic mode."
		},
		found1000Words: {
			title: "DEVOTED",
			message: "Find a total of 1000 words."
		},
		finishedWordLength10: {
			title: "IMPOSSIBLE",
			message: "Finish a level with 10 letters."
		},
		finishedStoryMode: {
			title: "THE LEGEND",
			message: "Finish Story mode."
		}
	},

	getChapterRequirement(language, chapterId) {
		return this.chapters[language][chapterId].requirement;
	},

	getModeUnlockRequirement(mode) {
		if (!this.modes[mode]) {
			console.log("Mode:", mode, "doesn't exist");
			return 0;
		}
		return this.modes[mode].requirement.amount;
	},

	getAchievementNotification(id) {
		if (!this.achievements[id]) {
			console.log("Achievement id:", id, "doesn't exist.");
			return null;
		}
		return this.achievements[id];
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
		console.log("Checking if song:", id, "is unlocked.");
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
			return ProgressManager.isAchievementUnlocked(requirement.id);
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