import { game } from "./main.js";
import { startGame } from "./game.js";
import { LevelManager } from "./level_manager.js";
import { getElement } from "./helper_functions.js";

function updateLanguageButtons() {
	if (game.language === "en") {
		getElement("-option-en").classList.add("active");
		getElement("-option-sv").classList.remove("active");
	} else if (game.language === "sv") {
		getElement("-option-sv").classList.add("active");
		getElement("-option-en").classList.remove("active");
	} else {
		console.log("updateLanguageButtons(): invalid language...");
	}
}

function setLanguage(language) {
	game.language = language;
	updateLanguageButtons();
	const storySettingsContainer = document.getElementById("story-settings-container");
	if (!storySettingsContainer.classList.contains("hidden")) {
		LevelManager.buildStoryLevels(game.language, levelId => {
			game.storyLevelId = levelId;
			startGame();
		});
	}
}

document.querySelectorAll(".language-button").forEach(button => {
	button.addEventListener("click", () => {
		setLanguage(button.dataset.language);
	})
});