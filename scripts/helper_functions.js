import { game } from "./main.js";

export function getElement(id) {
	const completeId = game.mode + id;
	const element = document.getElementById(completeId);
	return element;
}

export function createElementWithClass(type, className) {
	const element = document.createElement(type);
	element.classList.add(className);
	return element;
}