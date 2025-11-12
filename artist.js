// ===========================
// ARTIST PAGE LOGIC
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
 * Render artist hero section
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
 * Render popular tracks list
 * @param {Array} tracks - Array of track objects from API
 */
const renderPopularTracks = (tracks) => {
  const popularSongsContainer = document.querySelector(".popular-songs");
  if (!popularSongsContainer) return;

  // Clear existing tracks
  popularSongsContainer.innerHTML = "";

  // Render top tracks (limit to 8 for display)
  const tracksToShow = tracks.slice(0, 8);

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

    // Add click event to play track (optional - implementa dopo se serve)
    trackElement.addEventListener("click", () => {
      console.log("Playing track:", track.title);
      // TODO: Implementare la riproduzione
    });

    popularSongsContainer.appendChild(trackElement);
  });
};

/**
 * Render liked songs section
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
 * Initialize artist page
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
    const tracks = await getArtistTracks(artistId);

    // Render data
    renderArtistHero(artist);
    renderPopularTracks(tracks);
    renderLikedSection(artist);

    console.log("Artist page loaded successfully");
  } catch (error) {
    console.error("Error initializing artist page:", error);
    alert("Errore nel caricamento dei dati dell'artista");
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initArtistPage);

const switchTo = index => window.location.href = `/?page=${index}`

