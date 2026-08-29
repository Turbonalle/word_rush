const winningTitles = [
	"Great job!",
	"Well done!",
	"You got it!",
	"Awesome!",
	"Brilliant!",
	"Excellent!",
	"Fantastic!",
	"Impressive!",
	"Incredible!",
	"Perfect!",
	"Superb!",
	"Wonderful!",
	"Word master!",
	"On fire!",
	"Sharp thinking!",
	"Clean sweep!",
	"You're good!",
	"Victory!",
	"Piece of cake!",
	"Solved!",
	"Too easy!",
	"Crushed it!",
	"Unstoppable!",
	"Congratulations!",
	"Level finished!",
	"You found every word!"
];

export function getRandomWinningTitle() {
	const index = Math.floor(Math.random() * winningTitles.length);
	return winningTitles[index];
}