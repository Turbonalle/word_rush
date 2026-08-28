import { Save } from "./save.js";
import { game } from "./main.js";
import { findAndFillWords, submitWord, updateLetterBoxes } from "./game.js";
import { calculateLetterFrequency } from "./helper_functions.js";

document.addEventListener("keydown", e => {
	if (e.key === ".") {
		console.log("Pressed '.'");
		Save.resetSave();
	}
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
		console.log("Enter");
		if (game.mode === "test") {
			findAndFillWords();
		} else {
			submitWord();
		}
		return;
	}
	if (!/^[a-zåäö]$/i.test(e.key))
		return;
	if (game.currentInput.length >= game.wordLength)
		return;
	game.currentInput += e.key.toLowerCase();
	game.inputFrequency = calculateLetterFrequency(game.currentInput);
	updateLetterBoxes();
});