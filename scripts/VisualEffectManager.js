import { game } from "./main.js";
import { resetLetterBoxes } from "./letter_boxes.js"; 
import { getElementByMode } from "./helper_functions.js";

export const VisualEffectManager = {
	wordNotFound() {
		const container = getElementByMode(game.mode, "-candidate-word-container");
		for (const letterBox of container.children) {
			requestAnimationFrame(() => {
				letterBox.classList.add("error-shake");
			});
			setTimeout(() => {
				letterBox.classList.remove("error-shake");
				resetLetterBoxes();
			}, 1000);
		}
	}
}