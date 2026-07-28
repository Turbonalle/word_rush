import { game } from "./main.js";
import { submitWord } from "./game.js";

function updateLetterBoxes() {
	const boxes = document.querySelectorAll(".typing-letter-box");
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].textContent = game.currentInput[i] ?? "";
	}
}

document.addEventListener("keydown", e => {
	if (game.state !== "game")
		return;
	if (e.key === "Backspace") {
		if (game.currentInput.length > 0) {
			const newString = game.currentInput.slice(0, -1);
			game.currentInput = newString;
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
	game.currentInput += e.key.toUpperCase();
	updateLetterBoxes();
});