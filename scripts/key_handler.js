import { Save } from "./Save.js";
import { game } from "./main.js";
import { findAndFillWords, submitWord } from "./game.js";
import { updateLetterBoxes } from "./letter_boxes.js"; 
import { calculateLetterFrequency } from "./helper_functions.js";
import { UnlockNotificationManager } from "./UnlockNotificationManager.js";

document.addEventListener("keydown", e => {
	if (e.key === ".") {
		Save.resetSave();
	}
	if (e.key === "-") {
		UnlockNotificationManager.show("TEST", "This is just a test text.");
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