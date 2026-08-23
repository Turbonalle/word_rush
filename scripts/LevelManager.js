export const LevelManager = {
	storyLevels: {
		en: {},
		sv: {}
	},
	basicLevels: {
		en: {},
		sv: {}
	},

	async loadStoryLevels() {
		const [responseEn, responseSv] = await Promise.all([
			fetch("data/story_levels/story_levels_en.json"),
			fetch("data/story_levels/story_levels_sv.json")
		]);
		const levelsEn = await responseEn.json();
		const levelsSv = await responseSv.json();
		this.storyLevels.en = levelsEn;
		this.storyLevels.sv = levelsSv;
	},

	async loadBasicLevels() {
		const [responseEn3, responseEn4, responseEn5, responseSv3, responseSv4, responseSv5] = await Promise.all([
			fetch("data/basic_levels/en/basic_levels_3_en.json"),
			fetch("data/basic_levels/en/basic_levels_4_en.json"),
			fetch("data/basic_levels/en/basic_levels_5_en.json"),
			fetch("data/basic_levels/sv/basic_levels_3_sv.json"),
			fetch("data/basic_levels/sv/basic_levels_4_sv.json"),
			fetch("data/basic_levels/sv/basic_levels_5_sv.json")
		]);
		const levelsEn3 = await responseEn3.json();
		const levelsEn4 = await responseEn4.json();
		const levelsEn5 = await responseEn5.json();
		const levelsSv3 = await responseSv3.json();
		const levelsSv4 = await responseSv4.json();
		const levelsSv5 = await responseSv5.json();
		this.basicLevels.en[3] = Object.fromEntries(levelsEn3.map(level => [level.id, level]));
		this.basicLevels.en[4] = Object.fromEntries(levelsEn4.map(level => [level.id, level]));
		this.basicLevels.en[5] = Object.fromEntries(levelsEn5.map(level => [level.id, level]));
		this.basicLevels.sv[3] = Object.fromEntries(levelsSv3.map(level => [level.id, level]));
		this.basicLevels.sv[4] = Object.fromEntries(levelsSv4.map(level => [level.id, level]));
		this.basicLevels.sv[5] = Object.fromEntries(levelsSv5.map(level => [level.id, level]));
	},

	getChapters(language) {
		return this.storyLevels[language];
	},

	getChapter(language, chapterId) {
		return this.storyLevels[language][chapterId];
	},

	getChapterLevels(language, chapterId) {
		return this.storyLevels[language][chapterId].levels;
	},

	getChapterTitle(language, chapterId) {
		return this.storyLevels[language][chapterId].title;
	},

	getChapterRequirement(language, chapterId) {
		return this.storyLevels[language][chapterId].starUnlockRequirement;
	},

	getStoryLevel(language, chapterId, levelId) {
		console.log("Getting:", language, levelId);
		return this.storyLevels[language][chapterId].levels.find(
			level => level.id === levelId
		) ?? null;
	},

	getNextStoryLevel(language, chapterId, levelId) {
		// Check for next level in current chapter
		const nextLevelId = levelId + 1;
		let nextLevel = this.getStoryLevel(language, chapterId, nextLevelId);
		if (nextLevel !== null) {
			return nextLevel;
		}
		// Check for next level in next chapter
		const nextChapterId = chapterId + 1;
		nextLevel = this.getStoryLevel(language, nextChapterId, nextLevelId);
		return nextLevel;
	},

	getNextStoryLevelInfo(language, chapterId, levelId) {
		// Check for next level in current chapter
		const nextLevelId = levelId + 1;
		let nextLevel = this.getStoryLevel(language, chapterId, nextLevelId);
		if (nextLevel !== null) {
			return {
				chapterId: chapterId,
				id: nextLevelId,
				level: nextLevel
			};
		}
		// Check for next level in next chapter
		const nextChapterId = chapterId + 1;
		nextLevel = this.getStoryLevel(language, nextChapterId, nextLevelId);
		return {
			chapterId: nextChapterId,
			id: nextLevelId,
			level: nextLevel
		};
	},

	getRandomLevel(language, length) {
		const levels = Object.values(this.basicLevels[language][length]);
		console.log("We have", this.basicLevels[language][length].length, "levels");

		if (levels.length === 0) {
			return null;
		}
		const randomIndex = Math.floor(Math.random() * levels.length);
		return levels[randomIndex];
	},

	getPossibleWords(language, chapterId, levelId) {
		const level = this.storyLevels[language][chapterId].levels.find(
			level => level.id === levelId
		) ?? null;
		if (level === null) {
			console.log("Level is null");
			return null;
		}
		return level.answers;
	}
};