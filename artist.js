// ===========================
// ARTIST PAGE LOGIC (UNIFIED)
// ===========================

/**
 * Get artist ID from URL parameters
 * @returns {string|null} Artist ID or null if not found
 */
const getArtistIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

/**
 * Format duration from seconds to MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration (e.g., "3:45")
 */
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Format number with dots as thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1.234.567")
 */
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Render artist hero section (DESKTOP version)
 * @param {Object} artist - Artist data from API
 */
const renderArtistHero = (artist) => {
  // Update background image
  const artistHero = document.querySelector(".artist-hero");
  if (artistHero && artist.picture_xl) {
    artistHero.style.backgroundImage = `url('${artist.picture_xl}')`;
  }

  // Update artist name
  const artistName = document.querySelector(".artist-name");
  if (artistName) {
    artistName.textContent = artist.name;
  }

  // Update listeners count
  const artistListeners = document.querySelector(".artist-listeners");
  if (artistListeners && artist.nb_fan) {
    artistListeners.textContent = `${formatNumber(
      artist.nb_fan
    )} ascoltatori mensili`;
  }
};

/**
 * Render artist hero section (MOBILE version)
 * @param {Object} artist - Artist data from API
 */
const renderArtistHeroMobile = (artist) => {
  // Update background image
  const artistHero = document.querySelector(".artist-hero-mobile");
  if (artistHero && artist.picture_xl) {
    artistHero.style.backgroundImage = `url('${artist.picture_xl}')`;
  }

  // Update artist name
  const artistName = document.querySelector(".artist-name-mobile");
  if (artistName) {
    artistName.textContent = artist.name;
  }

  // Update listeners count
  const artistListeners = document.querySelector(".artist-listeners-mobile");
  if (artistListeners && artist.nb_fan) {
    artistListeners.textContent = `${formatNumber(
      artist.nb_fan
    )} ascoltatori mensili`;
  }
};

/**
 * Render popular tracks list (DESKTOP version)
 * @param {Array} tracks - Array of track objects from API
 */
const renderPopularTracks = (tracks) => {
  const popularSongsContainer = document.querySelector(".popular-songs");
  if (!popularSongsContainer) return;

  // Clear existing tracks
  popularSongsContainer.innerHTML = "";

  // Render top tracks (limit to 12 for desktop)
  const tracksToShow = tracks.slice(0, 12);

  tracksToShow.forEach((track, index) => {
    const trackElement = document.createElement("div");
    trackElement.className = "popular-song-item";

    trackElement.innerHTML = `
      <div class="d-flex align-items-center">
        <span class="song-number">${index + 1}</span>
        <img
          src="${track.album.cover_medium}"
          alt="${track.title}"
          class="song-img"
        />
        <div class="song-info flex-grow-1">
          <div class="song-title">${track.title}</div>
        </div>
        <span class="song-plays">${formatNumber(track.rank)}</span>
        <span class="song-duration">${formatDuration(track.duration)}</span>
      </div>
    `;

    // Add click event to play track
    trackElement.addEventListener("click", () => {
      console.log("Playing track:", track.title);
      // Carica per indice per mantenere la posizione nella playlist
      PlayerController.loadTrackByIndex(index);
    });

    popularSongsContainer.appendChild(trackElement);
  });
};

/**
 * Render popular tracks list (MOBILE version)
 * @param {Array} tracks - Array of track objects from API
 */
const renderPopularTracksMobile = (tracks) => {
  const popularSongsContainer = document.querySelector(".popular-songs-mobile");
  if (!popularSongsContainer) return;

  // Clear existing tracks
  popularSongsContainer.innerHTML = "";

  // Render top tracks (limit to 12 for mobile)
  const tracksToShow = tracks.slice(0, 12);

  tracksToShow.forEach((track, index) => {
    const trackElement = document.createElement("div");
    trackElement.className = "popular-song-item-mobile";

    trackElement.innerHTML = `
      <span class="song-number-mobile">${index + 1}</span>
      <img
        src="${track.album.cover_medium}"
        alt="${track.title}"
        class="song-img-mobile"
      />
      <div class="song-info-mobile">
        <div class="song-title-mobile">${track.title}</div>
        <div class="song-plays-mobile">${formatNumber(track.rank)}</div>
      </div>
      <button class="song-menu-mobile" aria-label="More options">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    `;

    // Add click event to play track
    trackElement.addEventListener("click", (e) => {
      // Don't trigger if clicking the menu button
      if (e.target.closest(".song-menu-mobile")) return;
      console.log("Playing track:", track.title);
      // Carica per indice per mantenere la posizione nella playlist
      PlayerController.loadTrackByIndex(index);
    });

    popularSongsContainer.appendChild(trackElement);
  });
};

/**
 * Render liked songs section (DESKTOP version)
 * @param {Object} artist - Artist data from API
 */
const renderLikedSection = (artist) => {
  const artistImg = document.querySelector(".liked-artist-img");
  const artistNameElement = document.querySelector(".liked-song-artist");

  if (artistImg && artist.picture_medium) {
    artistImg.src = artist.picture_medium;
    artistImg.alt = artist.name;
  }

  if (artistNameElement) {
    artistNameElement.textContent = `Di ${artist.name}`;
  }
};

/**
 * Render liked section (MOBILE version)
 * @param {Object} artist - Artist data from API
 */
const renderLikedSectionMobile = (artist) => {
  const artistImg = document.querySelector(".liked-artist-img-mobile");
  const artistNameText = document.querySelector(".artist-name-text");

  if (artistImg && artist.picture_medium) {
    artistImg.src = artist.picture_medium;
    artistImg.alt = artist.name;
  }

  if (artistNameText) {
    artistNameText.textContent = artist.name;
  }
};

/**
 * Initialize artist page (UNIFIED for both desktop and mobile)
 */
const initArtistPage = async () => {
  try {
    // Get artist ID from URL
    const artistId = getArtistIdFromUrl();

    if (!artistId) {
      console.error("No artist ID found in URL");
      alert("Artist ID non trovato. Reindirizzamento alla homepage...");
      window.location.href = "homepage.html";
      return;
    }

    // Show loading state (optional)
    console.log(`Loading artist ${artistId}...`);

    // Fetch artist data
    const artist = await getArtist(artistId);

    // Fetch artist tracks
    const allTracks = await getArtistTracks(artistId);

    // Usa solo i primi 12 brani più popolari
    const tracks = allTracks.slice(0, 12);

    // Render BOTH desktop and mobile layouts
    renderArtistHero(artist);
    renderArtistHeroMobile(artist);

    renderPopularTracks(tracks);
    renderPopularTracksMobile(tracks);

    renderLikedSection(artist);
    renderLikedSectionMobile(artist);

    // Precarica la prima traccia nel player (in pausa) - UNA VOLTA SOLA
    if (tracks && tracks.length > 0) {
      // Aspetta che il PlayerController sia pronto
      if (typeof PlayerController !== "undefined") {
        // Imposta la playlist dei 12 brani nel player
        PlayerController.setPlaylist(tracks);
        // Precarica la prima traccia in standby
        PlayerController.preloadTrack(tracks[0]);
        console.log(
          `🎵 Playlist caricata: ${tracks.length} brani - Prima traccia in standby`
        );
      }
    }

    // Setup play buttons della pagina (desktop e mobile)
    setupPagePlayButtons(tracks);

    console.log("Artist page loaded successfully (desktop + mobile)");
  } catch (error) {
    console.error("Error initializing artist page:", error);
    alert("Errore nel caricamento dei dati dell'artista");
  }
};

/**
 * Setup dei bottoni play principali della pagina artist
 * @param {Array} tracks - Array di tracce
 */
const setupPagePlayButtons = (tracks) => {
  // Bottone play desktop
  const playButtonDesktop = document.querySelector(".btn-play");
  if (playButtonDesktop) {
    playButtonDesktop.addEventListener("click", () => {
      handlePagePlayButton(tracks);
    });
  }

  // Bottone play mobile
  const playButtonMobile = document.querySelector(".btn-play-mobile");
  if (playButtonMobile) {
    playButtonMobile.addEventListener("click", () => {
      handlePagePlayButton(tracks);
    });
  }
};

/**
 * Gestisce il click sui bottoni play della pagina
 * @param {Array} tracks - Array di tracce
 */
const handlePagePlayButton = (tracks) => {
  if (!tracks || tracks.length === 0) return;

  // Se il player ha già una traccia e sta suonando, metti in pausa
  if (
    PlayerController.isPlaying &&
    PlayerController.currentTrack &&
    PlayerController.currentTrack.preview
  ) {
    PlayerController.pause();
    console.log("⏸️ Pausa dalla pagina");
  }
  // Se il player ha una traccia in pausa, riprendi
  else if (
    !PlayerController.isPlaying &&
    PlayerController.currentTrack &&
    PlayerController.currentTrack.preview
  ) {
    PlayerController.play();
    console.log("▶️ Play dalla pagina");
  }
  // Altrimenti carica e avvia la prima traccia
  else {
    PlayerController.loadTrack(tracks[0]);
    console.log("🎧 Caricata prima traccia dalla pagina");
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initArtistPage);

const switchTo = (index) => (window.location.href = `/?page=${index}`);
