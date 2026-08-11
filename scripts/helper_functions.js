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