import { Save } from "./save.js";
import { createElementWithClass } from "./helper_functions.js";

const STAR_SVG = `<svg class="star" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9L12 2.5z"/></svg>`;

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

	fillStars(container, n) {
		for (let i = 0; i < n && i < container.children.length; i++) {
			container.children[i].classList.add("filled");
		}
	},

	buildLevel(level, language, chapter, onLevelSelected) {
		const storyLevelsContainer = document.getElementById("story-levels-container");
		const storyLevelContainer = createElementWithClass("div", "story-level-container");
		const levelButton = createElementWithClass("div", "level-button");
		const levelProgressFill = createElementWithClass("div", "level-progress-fill");
		const levelButtonNumber = createElementWithClass("span", "level-button-number");
		const levelButtonTitle = createElementWithClass("span", "level-button-title");
		const levelButtonProgress = createElementWithClass("span", "level-button-progress");
		const storyLevelStarsContainer = createElementWithClass("div", "story-level-stars-container");
		const wordsFoundAmount = Save.getFoundWordsAmount(language, chapter, level.id);
		levelButtonNumber.textContent = level.id;
		levelButtonTitle.textContent = level.letters.toUpperCase();
		levelButtonProgress.textContent = `${wordsFoundAmount} / ${level.answers.length}`;
		console.log("id:", level.id, "progress:", wordsFoundAmount, "/", level.answers.length);

		for (let i = 0; i < 3; i++) {
			storyLevelStarsContainer.insertAdjacentHTML("beforeend", STAR_SVG);
		}
		const percentage = wordsFoundAmount / level.answers.length;
		if (percentage >= 1.0) {
			this.fillStars(storyLevelStarsContainer, 3);
		} else if (percentage >= 0.5) {
			this.fillStars(storyLevelStarsContainer, 2);
		} else if (percentage >= 0.25) {
			this.fillStars(storyLevelStarsContainer, 1);
		}

		levelProgressFill.style.width = `${percentage * 100}%`;
		
		levelButton.addEventListener("click", () => {
			onLevelSelected(level.id);
		});
		levelButton.append(levelProgressFill);
		levelButton.append(levelButtonNumber);
		levelButton.append(levelButtonTitle);
		levelButton.append(levelButtonProgress);
		storyLevelContainer.append(levelButton);
		storyLevelContainer.append(storyLevelStarsContainer);
		storyLevelsContainer.append(storyLevelContainer);
	},

	getChapterStarsAcquired(language, chapterId) {
		const chapter = this.storyLevels[language][chapterId];
		let chapterStarsAcquired = 0;
		for (let i = 0; i < chapter.levels.length; i++) {
			console.log("Checking level:", chapter.levels[i].id);
			const wordsFound = Save.getFoundWordsAmount(language, chapterId, chapter.levels[i].id);
			const wordsAmount = chapter.levels[i].answers.length;
			const percentage = wordsFound / wordsAmount;
			let levelStarsAcquired = 0;
			if (percentage === 1) {
				levelStarsAcquired = 3;
			} else if (percentage >= 0.5) {
				levelStarsAcquired = 2;
			} else if (percentage >= 0.25) {
				levelStarsAcquired = 1;
			}
			console.log("words found:", wordsFound);
			chapterStarsAcquired += levelStarsAcquired;
		}
		return chapterStarsAcquired;
	},

	buildChapter(language, chapterId, onLevelSelected) {
		console.log("Building chapter:", language, chapterId);

		// Set chapter title
		const chapterTitle = document.getElementById("story-chapter-title");
		chapterTitle.textContent = this.storyLevels[language][chapterId].title;

		// Set chapter requirements
		const chapterRequirementText = document.getElementById("story-chapter-requirement");
		const chapterStarsAcquired = this.getChapterStarsAcquired(language, chapterId);
		const chapterRequirement = this.storyLevels[language][chapterId].starUnlockRequirement;
		chapterRequirementText.textContent = `${chapterStarsAcquired} / ${chapterRequirement} stars`;

		// Set chapter levels
		const storyLevelsContainer = document.getElementById("story-levels-container");
		storyLevelsContainer.replaceChildren();
		this.storyLevels[language][chapterId].levels.forEach(level => {
			this.buildLevel(level, language, chapterId, onLevelSelected);
		});
	},

	getStoryLevel(language, chapterId, id) {
		console.log("Getting:", language, id);
		return this.storyLevels[language][chapterId].levels.find(
			level => level.id === id
		) ?? null;
	},

	getRandomLevel(language, length) {
		const levels = Object.values(this.basicLevels[language][length]);
		console.log("We have", this.basicLevels[language][length].length, "levels");

		if (levels.length === 0) {
			return null;
		}
		const randomIndex = Math.floor(Math.random() * levels.length);
		return levels[randomIndex];
	}
};