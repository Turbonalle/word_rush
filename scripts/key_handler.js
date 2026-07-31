import { game } from "./main.js";
import { submitWord, calculateLetterFrequency, updateLetterBoxes } from "./game.js";

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
		console.log("Enter");
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