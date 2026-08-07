import { Save } from "./save.js";
import { createElementWithClass } from "./helper_functions.js";

const STAR_SVG = `<svg class="star" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9L12 2.5z"/></svg>`;

export const LevelManager = {
	storyLevels: {
		en: [],
		sv: []
	},
	basicLevels: {
		en: {
			3: [],
			4: [],
			5: []
		},
		sv: {
			3: [],
			4: [],
			5: []
		}
	},

	async loadStoryLevels() {
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
		console.log(`Loaded ${Object.keys(this.basicLevels.en[3]).length} levels.`);
		console.log(`Loaded ${Object.keys(this.basicLevels.en[4]).length} levels.`);
		console.log(`Loaded ${Object.keys(this.basicLevels.en[5]).length} levels.`);
		console.log(`Loaded ${Object.keys(this.basicLevels.sv[3]).length} levels.`);
		console.log(`Loaded ${Object.keys(this.basicLevels.sv[4]).length} levels.`);
		console.log(`Loaded ${Object.keys(this.basicLevels.sv[5]).length} levels.`);
	},

	fillStars(container, n) {
		for (let i = 0; i < n && i < container.children.length; i++) {
			container.children[i].classList.add("filled");
		}
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
			levelButtonNumber.textContent = level.id;
			levelButtonTitle.textContent = level.letters.toUpperCase();
			levelButtonProgress.textContent = `${wordsFoundAmount} / ${level.answers.length}`;

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
		});
	},

	getStoryLevel(language, id) {
		return this.storyLevels[language]?.[id] ?? null;
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
};