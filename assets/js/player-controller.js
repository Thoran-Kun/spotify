// ===========================
// SPOTIFY PLAYER CONTROLLER
// ===========================
// Gestisce la riproduzione audio globale e l'aggiornamento della UI del player

const PlayerController = {
  audioElement: null,
  currentTrack: null,
  isPlaying: false,
  playlist: [], // Lista completa dei brani
  currentIndex: 0, // Indice del brano corrente nella playlist

  /**
   * Inizializza il player creando l'elemento audio e i suoi event listeners
   */
  init() {
    // Crea elemento audio HTML5
    this.audioElement = new Audio();

    // Event listeners per l'audio
    this.audioElement.addEventListener("play", () => {
      this.isPlaying = true;
      this.updatePlayButton(true);
    });

    this.audioElement.addEventListener("pause", () => {
      this.isPlaying = false;
      this.updatePlayButton(false);
    });

    this.audioElement.addEventListener("ended", () => {
      this.isPlaying = false;
      this.updatePlayButton(false);
      // Auto-play brano successivo quando finisce
      this.next();
    });

    this.audioElement.addEventListener("timeupdate", () => {
      this.updateProgressBar();
    });

    this.audioElement.addEventListener("loadedmetadata", () => {
      this.updateDuration();
    });

    // Event listener per il bottone play/pause
    this.setupPlayButton();

    // Event listeners per prev/next
    this.setupNavigationButtons();

    console.log("🎵 Player Controller initialized");
  },

  /**
   * Configura il bottone play/pause usando event delegation
   */
  setupPlayButton() {
    // Usa event delegation per gestire entrambi i bottoni (desktop e mobile)
    document.addEventListener("click", (e) => {
      if (
        e.target.closest(".play-pause-btn") ||
        e.target.closest(".play-pause-btn-mobile")
      ) {
        e.preventDefault();
        e.stopPropagation();
        console.log("🎵 Click sul bottone play/pause rilevato!");
        this.togglePlay();
      }
    });
  },

  /**
   * Configura i bottoni prev/next usando event delegation
   */
  setupNavigationButtons() {
    document.addEventListener("click", (e) => {
      // Bottone precedente (desktop e mobile)
      if (
        e.target.closest(".prev-btn") ||
        e.target.closest(".prev-btn-mobile")
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.previous();
      }
      // Bottone successivo (desktop e mobile)
      if (
        e.target.closest(".next-btn") ||
        e.target.closest(".next-btn-mobile")
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.next();
      }
    });
  },

  /**
   * Carica una nuova traccia nel player
   * @param {Object} track - Oggetto track dall'API Deezer con: preview, title, artist, album
   * @param {Boolean} autoPlay - Se true, avvia automaticamente la riproduzione (default: true)
   */
  loadTrack(track, autoPlay = true) {
    console.log("🎧 Loading track:", track.title);

    this.currentTrack = track;
    this.audioElement.src = track.preview;

    // Trova l'indice nella playlist se esiste
    if (this.playlist.length > 0) {
      const index = this.playlist.findIndex((t) => t.id === track.id);
      if (index !== -1) {
        this.currentIndex = index;
      }
    }

    // Aggiorna UI
    this.updatePlayerUI(track);

    // Auto-play quando si seleziona una traccia (se autoPlay è true)
    if (autoPlay) {
      this.play();
    }
  },

  /**
   * Imposta la playlist completa
   * @param {Array} tracks - Array di tracce
   */
  setPlaylist(tracks) {
    this.playlist = tracks;
    console.log(`📃 Playlist caricata: ${tracks.length} brani`);
  },

  /**
   * Precarica una traccia in standby (senza avviare la riproduzione)
   * @param {Object} track - Oggetto track dall'API Deezer
   */
  preloadTrack(track) {
    console.log("📼 Preloading track in standby:", track.title);
    this.loadTrack(track, false);
  },

  /**
   * Avvia la riproduzione
   */
  play() {
    if (this.audioElement.src) {
      this.audioElement.play().catch((error) => {
        console.error("Errore riproduzione:", error);
      });
    }
  },

  /**
   * Mette in pausa la riproduzione
   */
  pause() {
    this.audioElement.pause();
  },

  /**
   * Toggle tra play e pause
   */
  togglePlay() {
    console.log(
      `🔄 Toggle play - Stato attuale: ${this.isPlaying ? "Playing" : "Paused"}`
    );
    if (this.isPlaying) {
      console.log("⏸️ Metto in pausa...");
      this.pause();
    } else {
      console.log("▶️ Avvio riproduzione...");
      this.play();
    }
  },

  /**
   * Carica e riproduce una traccia per indice nella playlist
   * @param {Number} index - Indice della traccia nella playlist
   * @param {Boolean} autoPlay - Se true, avvia automaticamente (default: true)
   */
  loadTrackByIndex(index, autoPlay = true) {
    if (this.playlist.length === 0) {
      console.warn("⚠️ Playlist vuota");
      return;
    }

    if (index < 0 || index >= this.playlist.length) {
      console.warn(`⚠️ Indice ${index} fuori dai limiti della playlist`);
      return;
    }

    this.currentIndex = index;
    this.loadTrack(this.playlist[index], autoPlay);
  },

  /**
   * Passa alla traccia precedente
   */
  previous() {
    if (this.playlist.length === 0) {
      console.warn("⚠️ Nessuna playlist caricata");
      return;
    }

    let newIndex = this.currentIndex - 1;
    // Loop: se siamo alla prima traccia, torna all'ultima
    if (newIndex < 0) {
      newIndex = this.playlist.length - 1;
    }

    console.log(
      `⏮️ Traccia precedente: ${newIndex + 1}/${this.playlist.length}`
    );
    this.loadTrackByIndex(newIndex);
  },

  /**
   * Passa alla traccia successiva
   */
  next() {
    if (this.playlist.length === 0) {
      console.warn("⚠️ Nessuna playlist caricata");
      return;
    }

    let newIndex = this.currentIndex + 1;
    // Loop: se siamo all'ultima traccia, torna alla prima
    if (newIndex >= this.playlist.length) {
      newIndex = 0;
    }

    console.log(
      `⏭️ Traccia successiva: ${newIndex + 1}/${this.playlist.length}`
    );
    this.loadTrackByIndex(newIndex);
  },

  /**
   * Aggiorna l'interfaccia del player con i dati della traccia
   * @param {Object} track - Dati della traccia
   */
  updatePlayerUI(track) {
    // Aggiorna immagine album
    const albumImage = document.querySelector(".current-song-image img");
    if (albumImage && track.album) {
      albumImage.src = track.album.cover_medium || track.album.cover_small;
      albumImage.alt = track.album.title;
    }

    // Aggiorna titolo canzone
    const songTitle = document.querySelector(".current-song-info .song-title");
    if (songTitle) {
      songTitle.textContent = track.title_short || track.title;
    }

    // Aggiorna nome artista
    const artistName = document.querySelector(
      ".current-song-info .artist-name"
    );
    if (artistName && track.artist) {
      artistName.textContent = track.artist.name;
    }

    console.log("✅ Player UI updated");
  },

  /**
   * Aggiorna l'icona del bottone play/pause (desktop e mobile)
   * @param {Boolean} isPlaying - True se sta suonando
   */
  updatePlayButton(isPlaying) {
    // Aggiorna bottone player desktop
    const playButtonIcon = document.querySelector(".play-pause-btn i");
    if (playButtonIcon) {
      playButtonIcon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
    }

    // Aggiorna bottone player mobile
    const playButtonMobileIcon = document.querySelector(
      ".play-pause-btn-mobile i"
    );
    if (playButtonMobileIcon) {
      playButtonMobileIcon.className = isPlaying
        ? "fas fa-pause"
        : "fas fa-play";
    }

    // Aggiorna bottone principale pagina desktop
    const pagePlayButtonDesktop = document.querySelector(".btn-play i");
    if (pagePlayButtonDesktop) {
      pagePlayButtonDesktop.className = isPlaying
        ? "fas fa-pause"
        : "fas fa-play";
    }

    // Aggiorna bottone principale pagina mobile
    const pagePlayButtonMobile = document.querySelector(".btn-play-mobile i");
    if (pagePlayButtonMobile) {
      pagePlayButtonMobile.className = isPlaying
        ? "fas fa-pause"
        : "fas fa-play";
    }
  },

  /**
   * Aggiorna la barra di progresso in base al tempo corrente
   */
  updateProgressBar() {
    if (!this.audioElement.duration) return;

    const currentTime = this.audioElement.currentTime;
    const duration = this.audioElement.duration;
    const percentage = (currentTime / duration) * 100;

    // Aggiorna la barra di progresso desktop
    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
      progressFill.style.width = percentage + "%";
      // Rimuovi le classi di progresso fisse
      progressFill.className = "progress-fill";
    }

    // Aggiorna la barra di progresso mobile
    const mobileProgressFill = document.querySelector(".mobile-progress-fill");
    if (mobileProgressFill) {
      mobileProgressFill.style.width = percentage + "%";
    }

    // Aggiorna il tempo corrente
    const timeCurrentElement = document.querySelector(".time-current");
    if (timeCurrentElement) {
      timeCurrentElement.textContent = this.formatTime(currentTime);
    }
  },

  /**
   * Aggiorna la durata totale della traccia
   */
  updateDuration() {
    const timeTotalElement = document.querySelector(".time-total");
    if (timeTotalElement && this.audioElement.duration) {
      timeTotalElement.textContent = this.formatTime(
        this.audioElement.duration
      );
    }
  },

  /**
   * Formatta i secondi in formato mm:ss
   * @param {Number} seconds - Secondi da formattare
   * @returns {String} Tempo formattato (es: "3:24")
   */
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  },
};

// Inizializza il player quando il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
  PlayerController.init();
});
