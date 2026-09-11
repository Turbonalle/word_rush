import { game } from "./main.js";
import { getElementByMode } from "./helper_functions.js";

export function updateLetterBoxes() {
	const boxes = document.querySelectorAll(".typing-letter-box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].textContent = game.currentInput[i]?.toUpperCase() ?? "";
	}
	const seen = {};
	for (let i = 0; i < game.currentInput.length; i++) {
		const letter = game.currentInput[i];
		seen[letter] = (seen[letter] || 0) + 1;
		if (game.mode !== "test" && seen[letter] > (game.letterFrequency[letter] || 0)) {
			boxes[i].classList.add("color-error");
		} else {
			boxes[i].classList.remove("color-error");
		}
	}
	if (game.currentInput.length < boxes.length) {
		boxes[game.currentInput.length].classList.remove("color-error");
	}
}

export function resetLetterBoxes() {
	game.currentInput = "";
	game.inputFrequency = {};
	document.querySelectorAll(".typing-letter-box").forEach(box => {
		box.textContent = "";
		box.classList.remove("color-error");
	});
}

export function createLetterBoxes(amount) {
	const container = getElementByMode(game.mode, "-candidate-word-container");
	for (let i = 0; i < amount; i++) {
		const typingLetterBox = document.createElement("div");
		typingLetterBox.classList.add("typing-letter-box");
		container.append(typingLetterBox);
	}
}