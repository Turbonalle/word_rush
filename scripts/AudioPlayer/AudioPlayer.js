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
	
	updateUI() {
		document.getElementById("song-title").textContent = this.playlist[this.currentIndex]?.title ?? "";
		document.getElementById("play-button").textContent = this.isPlaying ? "⏸" : "▶";
	}
};