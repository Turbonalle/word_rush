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
	},
	wordAlreadyFound(word) {
		const container = getElementByMode(game.mode, "-found-words-container");
		const wordTag = Array.from(container.children).find(wordTag => wordTag.textContent === word);
		requestAnimationFrame(() => {
			wordTag.classList.add("error-shake");
		});
		setTimeout(() => {
			wordTag.classList.remove("error-shake");
			resetLetterBoxes();
		}, 1000);
	},
	newWordFound(word) {
		const container = getElementByMode(game.mode, "-found-words-container");
		const wordTag = Array.from(container.children).find(wordTag => wordTag.textContent === word);
		requestAnimationFrame(() => {
			wordTag.classList.add("correct-effect");
		});
		setTimeout(() => {
			wordTag.classList.remove("correct-effect");
			resetLetterBoxes();
		}, 1000);
	}
}