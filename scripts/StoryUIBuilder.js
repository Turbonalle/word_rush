import { Save } from "./save.js";
import { LevelManager } from "./LevelManager.js";
import { ProgressManager } from "./ProgressManager.js";
import { UnlockManager } from "./UnlockManager.js";
import { createElementWithClass } from "./helper_functions.js";
import { STAR_SVG } from "./svg.js";

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

	buildUnlockedChapter(language, chapterId, onLevelSelected) {
		console.log("Building unlocked chapter:", language, chapterId);

		// Set chapter title
		const chapterTitle = document.getElementById("story-chapter-title");
		chapterTitle.textContent = LevelManager.getChapterTitle(language, chapterId);

		
		// Set chapter requirements
		const chapterRequirement = LevelManager.getChapterRequirement(language, chapterId);
		const chapterRequirementText = document.getElementById("story-chapter-requirement");
		const chapterStarsAcquired = ProgressManager.getTotalStarsAcquired(language);
		chapterRequirementText.textContent = `${chapterStarsAcquired} / ${chapterRequirement} stars`;

		// Set chapter levels
		const storyLevelsContainer = document.getElementById("story-levels-container");
		storyLevelsContainer.replaceChildren();
		const levels = LevelManager.getChapterLevels(language, chapterId);
		levels.forEach(level => {
			this.buildLevel(level, language, chapterId, onLevelSelected);
		});
	},

	buildLockedChapter(language, chapterId) {
		console.log("Building locked chapter:", language, chapterId);
		const totalStars = ProgressManager.getTotalStarsAcquired(language);
		const chapterRequirement = UnlockManager.getChapterRequirement(language, chapterId);
		const lockedChapterInfo = document.getElementById("locked-chapter-info");
		lockedChapterInfo.textContent = `${totalStars} / ${chapterRequirement} stars`;
	},

	buildChapter(language, chapterId, onLevelSelected) {
		console.log("Building chapter:", language, chapterId);
		// Check if chapter is unlocked
		if (UnlockManager.isChapterUnlocked(language, chapterId)) {
			this.buildUnlockedChapter(language, chapterId, onLevelSelected);
			document.getElementById("story-chapter-container").classList.remove("hidden");
			document.getElementById("story-locked-chapter-container").classList.add("hidden");
		} else {
			this.buildLockedChapter(language, chapterId);
			document.getElementById("story-chapter-container").classList.add("hidden");
			document.getElementById("story-locked-chapter-container").classList.remove("hidden");
		}
	}
};