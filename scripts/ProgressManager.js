import { LevelManager } from "./LevelManager.js";
import { Save } from "./save.js";

export const ProgressManager = {
	starRequirement: {
		"1": 0.25,
		"2": 0.5,
		"3": 1.0
	},

	getLevelProgress(language, chapterId, levelId) {
		const possibleWords = LevelManager.getPossibleWords(language, chapterId, levelId);
		const foundWords = Save.getFoundWords(language, chapterId, levelId);
		
		if (possibleWords.length === 0) {
			return 0;
		}

		return foundWords.length / possibleWords.length;
	},

	getLevelStars(language, chapterId, levelId) {
		const progress = this.getLevelProgress(language, chapterId, levelId);
		
		if (progress >= this.starRequirement["3"]) return 3;
		if (progress >= this.starRequirement["2"]) return 2;
		if (progress >= this.starRequirement["1"]) return 1;
		
		return 0;
	},

	getChapterStarsAcquired(language, chapterId) {
		const chapter = LevelManager.getChapter(language, chapterId);
		let chapterStarsAcquired = 0;
		for (let i = 0; i < chapter.levels.length; i++) {
			const wordsFound = Save.getFoundWordsAmount(language, chapterId, chapter.levels[i].id);
			const wordsAmount = chapter.levels[i].answers.length;
			const percentage = wordsFound / wordsAmount;
			let levelStarsAcquired = 0;
			if (percentage === this.starRequirement["3"]) {
				levelStarsAcquired = 3;
			} else if (percentage >= this.starRequirement["2"]) {
				levelStarsAcquired = 2;
			} else if (percentage >= this.starRequirement["1"]) {
				levelStarsAcquired = 1;
			}
			chapterStarsAcquired += levelStarsAcquired;
		}
		return chapterStarsAcquired;
	},

	getTotalStarsAcquired(language) {
		const chapters = LevelManager.getChapters(language);
		let totalStarsAcquired = 0;
		for (const chapterId of Object.keys(chapters)) {
			totalStarsAcquired += this.getChapterStarsAcquired(language, chapterId);
		}
		return totalStarsAcquired;
	}
};