export const AudioPlayer = {
	audio: new Audio(),
	playlist: [],
	currentIndex: 0,
	isPlaying: false,

	init() {
		this.audio.addEventListener("ended", () => {
			this.next();
		});
	},
	
	loadPlaylist(playlist) {
		this.playlist = playlist;
		this.currentIndex = 0;
		if (playlist.length > 0) {
			this.audio.src = playlist[0].path;
			this.updateUI();
		}
	},
	
	play() {
		if (this.playlist.length === 0) {
			console.log("0 songs.");
			return;
		}
		this.audio.play();
		this.isPlaying = true;
		this.updateUI();
	},
	
	pause() {
		this.audio.pause();
		this.isPlaying = false;
		this.updateUI();
	},
	
	stop() {
		this.audio.pause();
		this.audio.currentTime = 0;
		this.isPlaying = false;
		this.updateUI();
	},

	togglePlay() {
		if (this.isPlaying)
			this.pause();
		else
			this.play();
	},
	
	shuffle() {
		const next = Math.floor(Math.random() * this.playlist.length);
		this.select(next);
	},
	
	next() {
		if (this.playlist.length === 0)
			return;
		this.currentIndex++;
		if (this.currentIndex >= this.playlist.length)
			this.currentIndex = 0;
		this.audio.src = this.playlist[this.currentIndex].path;
		if (this.isPlaying)
			this.audio.play();
		this.updateUI();
	},
	
	previous() {
		if (this.playlist.length === 0)
			return;
		this.currentIndex--;
		if (this.currentIndex < 0)
			this.currentIndex = this.playlist.length - 1;
		this.audio.src = this.playlist[this.currentIndex].path;
		if (this.isPlaying)
			this.audio.play();
		this.updateUI();
	},
	
	select(index) {
		if (index < 0 || index >= this.playlist.length)
			return;
		this.currentIndex = index;
		this.audio.src = this.playlist[index].path;
		if (this.isPlaying)
			this.audio.play();
		this.updateUI();
	},

	setVolume(volume) {
		this.audio.volume = volume;
	},

	togglePlaylist() {
		const playListcontainer = document.getElementById("playlist-container");
		const toggleButton = document.getElementById("toggle-playlist-button");
		playListcontainer.classList.toggle("hidden");
		toggleButton.textContent = playListcontainer.classList.contains("hidden") ? "▼" : "▲" ;
		if (playListcontainer.classList.contains("hidden")) {
			playListcontainer.replaceChildren();
		} else {
			this.buildPlaylist();
		}
	},

	buildPlaylist() {
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
		this.updateUI();
	},
	
	updateUI() {
		document.getElementById("song-title").textContent = this.playlist[this.currentIndex]?.title ?? "";
		document.getElementById("play-button").textContent = this.isPlaying ? "⏸" : "▶";
		document.querySelectorAll(".song-row").forEach(row =>
			row.classList.remove("active")
		);
		const playlistContainer = document.getElementById("playlist-container");
		const currentRow = playlistContainer.children[this.currentIndex]
		if (currentRow) {
			currentRow.classList.add("active");
		}
	}
};