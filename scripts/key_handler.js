import { Save } from "./Save.js";
import { game } from "./main.js";
import { findAndFillWords, submitWord } from "./game.js";
import { updateLetterBoxes } from "./letter_boxes.js"; 
import { calculateLetterFrequency } from "./helper_functions.js";
import { UnlockNotificationManager } from "./UnlockNotificationManager.js";
import { CueManager } from "./CueManager.js";

document.addEventListener("keydown", e => {
	if (game.typingLock === true || game.givenUp === true) {
		return;
	}

	// ---- DEBUGGING START ----------------------------------------------------
	if (e.key === ".") { Save.resetSave(); }
	if (e.key === "-") { UnlockNotificationManager.show("TEST", "This is just a test text."); }
	if (e.key === "1") { CueManager.activate("collect10Stars"); }
	if (e.key === "2") { CueManager.activate("collect30Stars"); }
	if (e.key === "3") { CueManager.activate("collect50Stars"); }
	if (e.key === "4") { CueManager.activate("finishedStoryMode"); }
	if (e.key === "5") { CueManager.activate("finishedDailyLevel"); }
	if (e.key === "6") { CueManager.activate("finishedZenLevel"); }
	if (e.key === "7") { CueManager.activate("finishedHardLevel"); }
	if (e.key === "8") { CueManager.activate("finishedPanicLevel"); }
	if (e.key === "9") { CueManager.activate("found100Words"); }
	if (e.key === "0") { CueManager.activate("finishedWordLength10"); }
	// ---- DEBUGGING END ------------------------------------------------------

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