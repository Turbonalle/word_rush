import { AudioPlayer } from "./AudioPlayer.js";

const playListcontainer = document.getElementById("playlist-container");
const toggleButton = document.getElementById("toggle-playlist-button");

document.getElementById("previous-button").addEventListener("click", () => { AudioPlayer.previous(); })
document.getElementById("play-button").addEventListener("click", () => { AudioPlayer.togglePlay(); })
document.getElementById("stop-button").addEventListener("click", () => { AudioPlayer.stop(); })
document.getElementById("next-button").addEventListener("click", () => { AudioPlayer.next(); })
toggleButton.addEventListener("click", () => {
	playListcontainer.classList.toggle("hidden");
	toggleButton.textContent = playListcontainer.classList.contains("hidden") ? "▼" : "▲" ;
});

function buildPlaylist() {
	const container = document.getElementById("playlist-container");
	container.replaceChildren();
	AudioPlayer.playlist.forEach((song, index) => {
		const row = document.createElement("div");
		row.className = "song-row";
		row.textContent = song.title;
		row.addEventListener("click", () => {
			AudioPlayer.select(index);
		});
		container.appendChild(row);
	});
}

buildPlaylist();