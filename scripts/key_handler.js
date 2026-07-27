import { gameState } from "./main.js";

document.addEventListener("keydown", e => {
	if (gameState.screen !== "game") {
		console.log("Not in game screen");
		return;
	}
	if (e.key === "Backspace") {
		console.log("Backspace pressed");
		// remove letter
		return;
	}
	if (e.key === "Enter") {
		console.log("Enter pressed");
		// submit word
		return;
	}
	if (!/^[a-zåäö]$/i.test(e.key)) {
		console.log("Not a letter");
		return;
	}
	// add letter
	console.log(e.key);
});