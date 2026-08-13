import { calculateLetterFrequency, canCreateWord } from "./helper_functions.js";

export const DictionaryManager = {
	dictionaryEn: null,
	dictionarySv: null,

	async loadDictionaries() {
		const [responseEn, responseSv] = await Promise.all([
			fetch("data/dictionaries/dictionary_en.json"),
			fetch("data/dictionaries/dictionary_sv.json"),
		]);
		this.dictionaryEn = await responseEn.json();
		this.dictionarySv = await responseSv.json();
		console.log("Dictionaries loaded.");
	},

	findPossibleWords(word, language) {
		if (!word) {
			return [];
		}

		// Set dictionary
		let dictionary = null;
		if (language === "en")
			dictionary = this.dictionaryEn;
		else if (language === "sv")
			dictionary = this.dictionarySv;

		// Store letter frequency for faster comparison
		const availableLetters = calculateLetterFrequency(word);

		// Find possible words
		const possibleWords = [];
		for (let length = 1; length <= word.length; length++) {
			const words = dictionary[length] ?? [];
			for (const candidate of words) {
				if (canCreateWord(candidate, availableLetters)) {
					possibleWords.push(candidate);
				}
			}
		}
		return possibleWords;
	}
};