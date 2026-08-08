import { AudioPlayer } from "./AudioPlayer.js";

const toggleButton = document.getElementById("toggle-playlist-button");

document.getElementById("previous-button").addEventListener("click", () => { AudioPlayer.previous(); })
document.getElementById("play-button").addEventListener("click", () => { AudioPlayer.togglePlay(); })
document.getElementById("stop-button").addEventListener("click", () => { AudioPlayer.stop(); })
document.getElementById("next-button").addEventListener("click", () => { AudioPlayer.next(); })
toggleButton.addEventListener("click", () => {
	AudioPlayer.togglePlaylist();
});