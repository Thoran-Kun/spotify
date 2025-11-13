// ===========================
// ARTIST MOBILE PAGE LOGIC
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
 * Format number with dots as thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1.234.567")
 */
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Render artist hero section (mobile version)
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
 * Render liked section (mobile version)
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
 * Render popular tracks list (mobile version)
 * @param {Array} tracks - Array of track objects from API
 */
const renderPopularTracksMobile = (tracks) => {
  const popularSongsContainer = document.querySelector(".popular-songs-mobile");
  if (!popularSongsContainer) return;

  // Clear existing tracks
  popularSongsContainer.innerHTML = "";

  // Render top tracks (limit to 10 for mobile)
  const tracksToShow = tracks.slice(0, 10);

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
      PlayerController.loadTrack(track);
    });

    popularSongsContainer.appendChild(trackElement);
  });
};

/**
 * Initialize artist mobile page
 */
const initArtistMobilePage = async () => {
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
    const tracks = await getArtistTracks(artistId);

    // Render data
    renderArtistHeroMobile(artist);
    renderLikedSectionMobile(artist);
    renderPopularTracksMobile(tracks);

    // Precarica la prima traccia nel player (in pausa)
    if (tracks && tracks.length > 0) {
      // Aspetta che il PlayerController sia pronto
      if (typeof PlayerController !== "undefined") {
        PlayerController.preloadTrack(tracks[0]);
        console.log("🎵 Prima traccia precaricata in standby");
      }
    }

    console.log("Artist mobile page loaded successfully");
  } catch (error) {
    console.error("Error initializing artist mobile page:", error);
    alert("Errore nel caricamento dei dati dell'artista");
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initArtistMobilePage);
