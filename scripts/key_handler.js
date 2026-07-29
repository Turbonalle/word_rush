import { game } from "./main.js";
import { submitWord, calculateLetterFrequency } from "./game.js";

function updateLetterBoxes() {
	const boxes = document.querySelectorAll(".typing-letter-box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].textContent = game.currentInput[i]?.toUpperCase() ?? "";
	}
	const seen = {};
	for (let i = 0; i < game.currentInput.length; i++) {
		const letter = game.currentInput[i];
		seen[letter] = (seen[letter] || 0) + 1;
		if (seen[letter] > (game.letterFrequency[letter] || 0)) {
			boxes[i].classList.add("invalid-character");
		} else {
			boxes[i].classList.remove("invalid-character");
		}
	}
	if (game.currentInput.length < boxes.length) {
		boxes[game.currentInput.length].classList.remove("invalid-character");
	}
}

document.addEventListener("keydown", e => {
	if (game.state !== "game")
		return;
	if (e.key === "Backspace") {
		if (game.currentInput.length > 0) {
			const newString = game.currentInput.slice(0, -1);
			game.currentInput = newString;
			game.inputFrequency = calculateLetterFrequency(game.currentInput);
			updateLetterBoxes();
		}
		return;
	}
	if (e.key === "Enter") {
		submitWord();
		return;
	}
	if (!/^[a-zåäö]$/i.test(e.key))
		return;
	if (game.currentInput.length >= game.wordLength)
		return;
	game.currentInput += e.key;
	game.inputFrequency = calculateLetterFrequency(game.currentInput);
	updateLetterBoxes();
});