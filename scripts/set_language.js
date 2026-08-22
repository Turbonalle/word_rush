import { game } from "./main.js";
import { startGame } from "./game.js";
import { setChapter, updateSettingsUI } from "./menu.js";
import { StoryUIBuilder } from "./StoryUIBuilder.js";

function setLanguage(language) {
	game.language = language;
	updateSettingsUI();
	const storySettingsContainer = document.getElementById("story-settings-container");
	if (!storySettingsContainer.classList.contains("hidden")) {
		StoryUIBuilder.buildChapter(game.language, game.currentStoryChapter, levelId => {
			game.storyLevelId = levelId;
			startGame();
		});
	}
}

document.querySelectorAll(".language-button").forEach(button => {
	button.addEventListener("click", () => {
		setChapter(1);
		setLanguage(button.dataset.language);
	})
});