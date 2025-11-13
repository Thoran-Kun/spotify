// ===========================
// ARTIST API FUNCTIONS
// ===========================
// Chiamate API della pagina artista

let currentArtist;

/**
 * Fetch artist data by ID
 * @param {string|number} id - Artist ID
 * @returns {Promise<Object>} Artist data
 */
const getArtist = async function (id) {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
    );
    if (!res.ok) throw new Error(`[${res.status}] http status not ok`);
    const data = await res.json();
    currentArtist = data;
    return data;
  } catch (err) {
    console.error(`Error fetching artist: ${err}`);
    throw err;
  }
};

/**
 * Fetch artist's top tracks
 * @param {string|number} id - Artist ID
 * @returns {Promise<Array>} Array of tracks
 */
const getArtistTracks = async function (id) {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
    );
    if (!res.ok) throw new Error(`[${res.status}] http status not ok`);
    const data = await res.json();
    return data.data; // Returns array of tracks
  } catch (err) {
    console.error(`Error fetching artist tracks: ${err}`);
    throw err;
  }
};

/**
 * Create a link to artist page with ID parameter
 * Uses router that automatically redirects to mobile or desktop version
 * @param {string|number} artistId - Artist ID
 * @returns {string} URL to artist router page
 */
const createArtistLink = (artistId) => {
  return `artist.html?id=${artistId}`;
};

/**
 * Navigate to artist page (router handles mobile/desktop)
 * Use this function when clicking on artist links
 * @param {string|number} artistId - Artist ID
 */
const goToArtist = (artistId) => {
  window.location.href = `artist.html?id=${artistId}`;
};
