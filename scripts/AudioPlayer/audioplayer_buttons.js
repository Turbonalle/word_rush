import { AudioPlayer } from "./AudioPlayer.js";

document.getElementById("previous-button").addEventListener("click", () => { AudioPlayer.previous(); })
document.getElementById("play-button").addEventListener("click", () => { AudioPlayer.togglePlay(); })
document.getElementById("stop-button").addEventListener("click", () => { AudioPlayer.stop(); })
document.getElementById("next-button").addEventListener("click", () => { AudioPlayer.next(); })
document.getElementById("toggle-playlist-button").addEventListener("click", () => {
	AudioPlayer.togglePlaylist();
});