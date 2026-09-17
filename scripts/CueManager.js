import { Save } from "./Save.js";

export const CueManager = {
	update() {
		// Mode buttons
		document.getElementById("zen-mode-button").classList.toggle("unseen", Save.seen.zenButton === false);
		document.getElementById("hard-mode-button").classList.toggle("unseen", Save.seen.hardButton === false);
		document.getElementById("panic-mode-button").classList.toggle("unseen", Save.seen.panicButton === false);
		document.getElementById("test-mode-button").classList.toggle("unseen", Save.seen.testButton === false);
		// Unlockables
		document.getElementById("mode-to-unlockables").classList.toggle("unseen", Save.hasUnseenUnlockable());
		document.getElementById("collect10Stars").classList.toggle("unseen", Save.seen.unlockables.collect10Stars === false);
		document.getElementById("collect30Stars").classList.toggle("unseen", Save.seen.unlockables.collect30Stars === false);
		document.getElementById("collect50Stars").classList.toggle("unseen", Save.seen.unlockables.collect50Stars === false);
		document.getElementById("finishedStoryMode").classList.toggle("unseen", Save.seen.unlockables.finishedStoryMode === false);
		document.getElementById("finishedDailyLevel").classList.toggle("unseen", Save.seen.unlockables.finishedDailyLevel === false);
		document.getElementById("finishedZenLevel").classList.toggle("unseen", Save.seen.unlockables.finishedZenLevel === false);
		document.getElementById("finishedHardLevel").classList.toggle("unseen", Save.seen.unlockables.finishedHardLevel === false);
		document.getElementById("finishedPanicLevel").classList.toggle("unseen", Save.seen.unlockables.finishedPanicLevel === false);
		document.getElementById("found100Words").classList.toggle("unseen", Save.seen.unlockables.found100Words === false);
		document.getElementById("found1000Words").classList.toggle("unseen", Save.seen.unlockables.found1000Words === false);
		document.getElementById("finishedWordLength10").classList.toggle("unseen", Save.seen.unlockables.finishedWordLength10 === false);
		document.getElementById("finishedBossBattle").classList.toggle("unseen", Save.seen.unlockables.finishedBossBattle === false);
		// Songs
		document.getElementById("audio-player").classList.toggle("unseen", Save.hasUnseenSong());
		document.getElementById("song1").classList.toggle("unseen", Save.seen.songs.song1 === false);
		document.getElementById("song2").classList.toggle("unseen", Save.seen.songs.song2 === false);
		document.getElementById("song3").classList.toggle("unseen", Save.seen.songs.song3 === false);
		document.getElementById("song4").classList.toggle("unseen", Save.seen.songs.song4 === false);
		document.getElementById("song5").classList.toggle("unseen", Save.seen.songs.song5 === false);
		document.getElementById("song6").classList.toggle("unseen", Save.seen.songs.song6 === false);
		document.getElementById("song7").classList.toggle("unseen", Save.seen.songs.song7 === false);
		document.getElementById("song8").classList.toggle("unseen", Save.seen.songs.song8 === false);
		document.getElementById("song9").classList.toggle("unseen", Save.seen.songs.song9 === false);
	},

	activate(id) {
		console.log("activating cue for:", id);
		switch(id) {
			case "collect10Stars":
				Save.setSeenMode("zenButton", true);
				break;
			case "collect30Stars":
				Save.setSeenMode("hardButton", true);
				break;
			case "collect50Stars":
				Save.setSeenMode("panicButton", true);
				break;
			case "finishedStoryMode":
				// Add cue to Boss Battle mode
				break;
			case "finishedDailyLevel":
				// Add cue to audioplayer and correct song
				break;
			case "finishedZenLevel":
				// Add cue to audioplayer and correct song
				break;
			case "finishedHardLevel":
				// Add cue to audioplayer and correct song
				break;
			case "finishedPanicLevel":
				// Add cue to audioplayer and correct song
				break;
			case "found1000Words":
				// Add cue to audioplayer and correct song
				break;
			case "found100Words":
				// Add cue to audioplayer and correct song
				break;
			case "finishedWordLength10":
				// Add cue to audioplayer and correct song
				break;
			case "finishedBossBattle":
				// Add cue to audioplayer and correct song
				break;
		}
		Save.setSeenUnlockable(id, true);
		this.update();
	}
};