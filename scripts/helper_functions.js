export function getElement(mode, id) {
	const completeId = mode + id;
	const element = document.getElementById(completeId);
	return element;
}

export function createElementWithClass(type, className) {
	const element = document.createElement(type);
	element.classList.add(className);
	return element;
}

export function calculateLetterFrequency(word) {
	const frequency = {};
	for (const letter of word) {
		if (frequency[letter]) {
			frequency[letter]++;
		} else {
			frequency[letter] = 1;
		}
	}
	return frequency;
}

export function canCreateWord(candidate, availableLetters) {
	const candidateFrequency = calculateLetterFrequency(candidate);
	for (const letter in candidateFrequency) {
		if ((availableLetters[letter] ?? 0) < candidateFrequency[letter]) {
			return false;
		}
	}
	return true;
}