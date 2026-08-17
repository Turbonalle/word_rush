import { game } from "./main.js";
import { startGame } from "./game.js";
import { setChapter } from "./menu.js";
import { LevelManager } from "./LevelManager.js";
import { getElement } from "./helper_functions.js";

function updateLanguageButtons() {
	if (game.language === "en") {
		getElement(game.mode, "-option-en").classList.add("active");
		getElement(game.mode, "-option-sv").classList.remove("active");
	} else if (game.language === "sv") {
		getElement(game.mode, "-option-sv").classList.add("active");
		getElement(game.mode, "-option-en").classList.remove("active");
	} else {
		console.log("updateLanguageButtons(): invalid language...");
	}
}

function setLanguage(language) {
	game.language = language;
	updateLanguageButtons();
	const storySettingsContainer = document.getElementById("story-settings-container");
	if (!storySettingsContainer.classList.contains("hidden")) {
		LevelManager.buildChapter(game.language, game.currentStoryChapter, levelId => {
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