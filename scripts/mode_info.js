const modeInfoContainer = document.getElementById("mode-info-container");

const modeDescriptions = {
	story: "Play through increasingly difficult handcrafted levels.",
	basic: "Get a random word and find as many words as possible.",
	panic: "Beat the clock before time runs out.",
	test: "Write a word and see which words can be created from it."
};

document.getElementById("story-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.story;
});

document.getElementById("basic-mode-button").addEventListener("mouseenter", () => {
	modeInfoContainer.textContent = modeDescriptions.basic;
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