import { Save } from "./save.js";
import { createElementWithClass } from "./helper_functions.js";

const STAR_SVG = `<svg class="star" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9L12 2.5z"/></svg>`;

export const LevelManager = {
	storyLevels: {
		en: [],
		sv: []
	},
	basicLevels: {
		en: [],
		sv: []
	},

	async load() {
		const [responseEn, responseSv] = await Promise.all([
			fetch("data/story_levels/story_levels_en.json"),
			fetch("data/story_levels/story_levels_sv.json")
		]);
		const levelsEn = await responseEn.json();
		const levelsSv = await responseSv.json();
		this.storyLevels.en = Object.fromEntries(
			levelsEn.map(level => [level.id, level])
		);
		this.storyLevels.sv = Object.fromEntries(
			levelsSv.map(level => [level.id, level])
		);
		console.log(`Loaded ${Object.keys(this.storyLevels.en).length} levels.`);
		console.log(`Loaded ${Object.keys(this.storyLevels.sv).length} levels.`);
	},

	async loadBasicLevels() {
		const [responseEn, responseSv] = await Promise.all([
			fetch("data/basic_levels/basic_levels_en.json"),
			fetch("data/basic_levels/basic_levels_sv.json")
		]);
		const levelsEn = await responseEn.json();
		const levelsSv = await responseSv.json();
		this.basicLevels.en = Object.fromEntries(
			levelsEn.map(level => [level.id, level])
		);
		this.basicLevels.sv = Object.fromEntries(
			levelsSv.map(level => [level.id, level])
		);
		console.log(`Loaded ${Object.keys(this.basicLevels.en).length} levels.`);
		console.log(`Loaded ${Object.keys(this.basicLevels.sv).length} levels.`);
	},

	buildStoryLevels(language, onLevelSelected) {
		const storyLevelsContainer = document.getElementById("story-levels-container");
		storyLevelsContainer.replaceChildren();
		Object.entries(this.storyLevels[language]).forEach(([id, level]) => {
			const storyLevelContainer = createElementWithClass("div", "story-level-container");
			const levelButton = createElementWithClass("div", "level-button");
			const levelProgressFill = createElementWithClass("div", "level-progress-fill");
			const levelButtonNumber = createElementWithClass("span", "level-button-number");
			const levelButtonTitle = createElementWithClass("span", "level-button-title");
			const levelButtonProgress = createElementWithClass("span", "level-button-progress");
			const storyLevelStarsContainer = createElementWithClass("div", "story-level-stars-container");
			const wordsFoundAmount = Save.getFoundWordsAmount(language, id);
			for (let i = 0; i < 3; i++) {
				storyLevelStarsContainer.insertAdjacentHTML("beforeend", STAR_SVG);
			}
			levelButtonNumber.textContent = level.id;
			levelButtonTitle.textContent = level.letters.toUpperCase();
			levelButtonProgress.textContent = `${wordsFoundAmount} / ${level.answers.length}`;
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
		});
	},

	getStoryLevel(language, id) {
		return this.storyLevels[language]?.[id] ?? null;
	},

	getRandomLevel(language, length) {
		const possibleLevels = this.basicLevel[language].filter(level => {
			level.answers.length === length;
		});
		console.log("We have", possibleLevels.length, "levels");
		const randomIndex = Math.floor(Math.random() * possibleLevels.length);
		return possibleLevels[randomIndex];
	},
};