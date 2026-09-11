import { game } from "./main.js";
import { getElementByMode } from "./helper_functions.js";

export const VisualEffectManager = {
	wordNotFound() {
		const container = getElementByMode(game.mode, "-candidate-word-container");
		console.log(container);
		for (const letterBox of container.children) {
			requestAnimationFrame(() => {
				letterBox.classList.add("error-border");
			});
			setTimeout(() => {
				letterBox.classList.remove("error-border");
			}, 1000);
		}
	}
}