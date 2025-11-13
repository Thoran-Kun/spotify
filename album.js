const Album = function () {
  return `
          <div class="content-wrapper p-4">
            <!-- Header con navigazione -->
            <div
              class="content-header d-flex justify-content-between align-items-center mb-4"
            >
              <div class="nav-arrows">
                <button
                  class="btn btn-dark rounded-circle me-2"
                  title="Torna indietro"
                  aria-label="Torna indietro"
		  onclick="indietro()"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button
                  class="btn btn-dark rounded-circle"
                  title="Vai avanti"
                  aria-label="Vai avanti"
		  onclick="avanti()"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>

              <div class="user-profile d-flex align-items-center">
                <div class="dropdown">
                  <button
                    class="btn btn-dark dropdown-toggle d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <div
                      class="profile-pic bg-secondary rounded-circle me-2"
                    ></div>
                    <span>Lidia Nautilus</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- CONTENUTO ALBUM - HERO SUPERIORE -->
            <div class="album-section">
              <!-- TOP -->
              <div class="album-top">
                <img
                  src="${currentAlbum.cover}"
                  class="cover"
                />

                <div class="album-info flex-grow-1">
                  <h1>${currentAlbum.title}</h1>

                  <div class="artist-row">
                    <img
                      src="${currentAlbum.artist.picture_small}"
                      class="artist-avatar"
                    />
                    <div>
                      <div class="meta">${currentAlbum.artist.name}</div>
                      <div class="meta">
                        Uscita: <strong>2017</strong> ·
                        <strong>12 brani</strong> ·
                        <strong>53:20</strong>
                      </div>
                    </div>
                  </div>

                  <div class="controls">
                    <button
                      class="btn btn-dark btn-play"
                      title="Play"
                      style="background: #1db954; border: none"
                    >
                      <i
                        class="bi bi-play-fill"
                        style="font-size: 1.4rem; color: #fff"
                      ></i>
                    </button>

                    <button
                      class="btn btn-outline-light custom"
                      title="Mi piace"
                    >
                      <i class="bi bi-heart"></i>
                    </button>

                    <button class="btn btn-outline-light custom" title="Altro">
                      <i class="bi bi-three-dots"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- LISTA TRACCE -->
              <div
                style="
                  background: linear-gradient(
                    to bottom,
                    #dfc050 -20%,
                    #000000 25%
                  );
                "
                class="album-list"
              >
                <div class="list-header">
                  <div class="d-flex align-items-center gap-3">
                    <div
                      style="
                        width: 40px;
                        text-align: center;
                        color: rgba(255, 255, 255, 0.75);
                      "
                    >
                      #
                    </div>
                    <div style="min-width: 200px">Titolo</div>
                  </div>
                  <div style="display: flex; gap: 2rem; align-items: center">
                    <div
                      style="
                        width: 180px;
                        text-align: center;
                        color: rgba(255, 255, 255, 0.75);
                      "
                    >
                      Riproduzioni
                    </div>
                    <div
                      style="
                        width: 70px;
                        text-align: right;
                        color: rgba(255, 255, 255, 0.75);
                      "
                    >
                      Durata
                    </div>
                  </div>
                </div>

                <ul class="list-group">
		${Tracklist()}
                </ul>
              </div>
            </div>
          </div>
	  `;
};

const Tracklist = function () {
  let currentTracklist = "";
  currentAlbum.tracks.data.forEach((track, i) => {
    currentTracklist += Track(track, i);
  });
  return currentTracklist;
};

// TODO convert
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const Track = function (track, i) {
  return `
                  <li class="list-group-item">
                    <div class="track-number">${i + 1}</div>

                    <div class="track-main ms-2">
                      <div class="track-title">${track.title}</div>
                      <div class="track-sub"></div>
                    </div>

                    <div class="track-plays">${track.rank}</div>

                    <div class="track-duration me-3">${formatDuration(
                      track.duration
                    )}</div>
                  </li>
	`;
};

const AlbumMobile = function () {
  document.getElementById("player-container")?.remove();
  return `
  <main>
      <header class="album-header">
        <a onclick="indietro()" class="album-back" aria-label="Back">
          <i class="bi bi-arrow-left" aria-hidden="true"></i>
        </a>

        <div class="album-art-wrap">
          <img src="${
            currentAlbum.cover_medium
          }" alt="Album art" class="album-art">
        </div>

        <div class="details">
          <h1 class="album-title">${currentAlbum.title}</h1>
          <div class="album-meta">
            <div style="display: flex; align-items: center">
              <div class="artist-avatar">
                <img src="${
                  currentAlbum.cover_small
                }" alt="artist" style="width: 100%; height: 100%; object-fit: cover">
              </div>
              <div class="artist-name">${currentAlbum.artist.name}</div>
            </div>
            <div class="album-type">Album • ${
              currentAlbum.release_date.split("-")[0]
            }</div>
          </div>
        </div>

        <div class="header-controls">
          <div class="controls-left">
            <button class="icon-btn" aria-label="Like">
              <i class="bi bi-heart" aria-hidden="true"></i>
            </button>
            <button class="icon-btn" aria-label="Download">
              <i class="bi bi-arrow-down-circle" aria-hidden="true"></i>
            </button>
            <button class="icon-btn" aria-label="More">
              <i class="bi bi-three-dots-vertical" aria-hidden="true"></i>
            </button>
          </div>

          <div style="display: flex; align-items: center">
            <button class="shuffle-btn" aria-label="Shuffle">
              <i class="bi bi-shuffle" aria-hidden="true"></i>
            </button>

            <button class="play-btn" aria-label="Play">
              <i class="bi bi-play-fill" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>

    
    </main>
   
    ${trackSectionMobile()}
  `;
};
const trackSectionMobile = function () {
  let TracklistMobile = "";
  for (const track of currentAlbum.tracks.data) {
    TracklistMobile += Kitemu(track);
  }

  return `
    <section class="tracks">
        ${TracklistMobile}
      </section>
    `;
};

const Kitemu = function (track) {
  return `
  <div class="track-item">
          <div class="track-left">
            <div class="track-title">${track.title}</div>
            <div class="track-artist">${track.artist.name}</div>
          </div>
          <div class="track-right">
            <i class="bi bi-three-dots-vertical" aria-hidden="true"></i>
          </div>
        </div>
  `;
};

const Player = function () {
  return `
   <div class="mini-player-wrapper">
      <div class="mini-player" role="region" aria-label="Now playing">
        <div class="mini-info">
          <div class="mini-title">Supernatural Parody</div>
          <div class="mini-sub" style="display: none">The Hillyw...</div>
        </div>
        <div class="mini-actions">
          <i class="bi bi-speaker"></i>
          <i class="bi bi-heart"></i>
          <button class="mini-play-btn" aria-label="Play/Pause">
            <i class="bi bi-play-fill"></i>
          </button>
        </div>
      </div>
    </div> 
     ${FooterNav()}
  `;
};
const FooterNav = function () {
  return `
  <nav class="bottom-nav" role="navigation" aria-label="Bottom navigation">
      <a href="#" class="nav-item" aria-label="Home">
        <i class="bi bi-house-door-fill" aria-hidden="true"></i>
        <span class="nav-label">Home</span>
      </a>
      <a href="#" class="nav-item" aria-label="Cerca">
        <i class="bi bi-search" aria-hidden="true"></i>
        <span class="nav-label">Cerca</span>
      </a>
      <a href="#" class="nav-item" aria-label="La tua libreria">
        <i class="bi bi-list" aria-hidden="true"></i>
        <span class="nav-label">La tua libreria</span>
      </a>
    </nav>
  `;
};
