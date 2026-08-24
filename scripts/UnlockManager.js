import { ProgressManager } from "./ProgressManager.js";

export const UnlockManager = {
	achievements: {
		fullStarStoryLevel: false,
		unlockChapter2: false,
		finishedzenLevel: false,
		finishedPanicLevel: false,
		found100Words: false,
		collected100Stars: false
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
	}
};