export const audio = {
	music: new Audio("audio/wordhunt_groove.mp3"),
	// submit: new Audio("audio/submit.mp3"),
	// invalid: new Audio("audio/invalid.mp3"),
	// correct: new Audio("audio/correct.mp3"),
	// finished: new Audio("audio/finished.mp3"),
	play(sound) {
		if (sound === "music") {
			this.music.play();
		}
		// } else if (sound === "submit") {
		// 	this.submit.play();
		// } else if (sound === "invalid") {
		// 	this.invalid.play();
		// } else if (sound === "correct") {
		// 	this.correct.play();
		// } else if (sound === "finished") {
		// 	this.finished.play();
		// }
	}
};