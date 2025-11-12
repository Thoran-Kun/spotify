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

const Tracklist = function(){
	let currentTracklist = ''
	currentAlbum.tracks.data.forEach((track, i) =>{
		currentTracklist += Track(track, i)	
	})
	return currentTracklist
}

// TODO convert
const formatDuration = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const Track = function (track, i) {
	return `
                  <li class="list-group-item">
                    <div class="track-number">${i+1}</div>

                    <div class="track-main ms-2">
                      <div class="track-title">${track.title}</div>
                      <div class="track-sub"></div>
                    </div>

                    <div class="track-plays">${track.rank}</div>

                    <div class="track-duration me-3">${formatDuration(track.duration)}</div>
                  </li>
	`
}
