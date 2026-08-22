import { Save } from "./save.js";
import { LevelManager } from "./LevelManager.js";
import { ProgressManager } from "./ProgressManager.js";
import { createElementWithClass } from "./helper_functions.js";

const STAR_SVG = `<svg class="star" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9L12 2.5z"/></svg>`;

export const StoryUIBuilder = {
	fillStars(container, n) {
		for (let i = 0; i < n && i < container.children.length; i++) {
			container.children[i].classList.add("filled");
		}
	},

	buildLevel(level, language, chapterId, onLevelSelected) {
		const storyLevelsContainer = document.getElementById("story-levels-container");
		const storyLevelContainer = createElementWithClass("div", "story-level-container");
		const levelButton = createElementWithClass("div", "level-button");
		const levelProgressFill = createElementWithClass("div", "level-progress-fill");
		const levelButtonNumber = createElementWithClass("span", "level-button-number");
		const levelButtonTitle = createElementWithClass("span", "level-button-title");
		const levelButtonProgress = createElementWithClass("span", "level-button-progress");
		const storyLevelStarsContainer = createElementWithClass("div", "story-level-stars-container");
		const wordsFoundAmount = Save.getFoundWordsAmount(language, chapterId, level.id);

		levelButtonNumber.textContent = level.id;
		levelButtonTitle.textContent = level.letters.toUpperCase();
		levelButtonProgress.textContent = `${wordsFoundAmount} / ${level.answers.length}`;

		for (let i = 0; i < 3; i++) {
			storyLevelStarsContainer.insertAdjacentHTML("beforeend", STAR_SVG);
		}

		const starsAmount = ProgressManager.getLevelStars(language, chapterId, level.id);
		this.fillStars(storyLevelStarsContainer, starsAmount);

		const percentage = ProgressManager.getLevelProgress(language, chapterId, level.id);
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

	buildChapter(language, chapterId, onLevelSelected) {
		console.log("Building chapter:", language, chapterId);

		// Set chapter title
		const chapterTitle = document.getElementById("story-chapter-title");
		chapterTitle.textContent = LevelManager.getChapterTitle(language, chapterId);

		// Set chapter requirements
		const chapterRequirementText = document.getElementById("story-chapter-requirement");
		const chapterStarsAcquired = ProgressManager.getChapterStarsAcquired(language, chapterId);
		const chapterRequirement = LevelManager.getChapterRequirement(language, chapterId);
		chapterRequirementText.textContent = `${chapterStarsAcquired} / ${chapterRequirement} stars`;

		// Set chapter levels
		const storyLevelsContainer = document.getElementById("story-levels-container");
		storyLevelsContainer.replaceChildren();
		const levels = LevelManager.getChapterLevels(language, chapterId);
		levels.forEach(level => {
			this.buildLevel(level, language, chapterId, onLevelSelected);
		});
	}
};