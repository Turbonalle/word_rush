const modeInfoContainer = document.getElementById("mode-info-container");

const modeDescriptions = {
	daily: "Play the word of the day.",
	story: "Play through increasingly difficult handcrafted levels.",
	zen: "Get a random word and find as many words as possible.",
	hard: "Find all the words, but three strikes and you're out.",
	panic: "Beat the clock.",
	test: "Write a word and see which words can be created from it."
};

document.getElementById("daily-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.daily;
});

document.getElementById("story-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.story;
});

document.getElementById("zen-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.zen;
});

document.getElementById("hard-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.hard;
});

document.getElementById("panic-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.panic;
});

document.getElementById("test-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.test;
});

document.querySelectorAll(".mode-button").forEach(button => {
	button.addEventListener("mouseleave", () => {
		modeInfoContainer.textContent = "";
	});
});