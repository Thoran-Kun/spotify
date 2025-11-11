const Album = function(){
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
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button
                  class="btn btn-dark rounded-circle"
                  title="Vai avanti"
                  aria-label="Vai avanti"
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

            <!-- CONTENUTO ALBUM - DA COMPLETARE -->
            <div class="album-page-content">
              <h1 class="display-4 mb-4">Album Page</h1>
              <p class="text-white-50">
              </p>

              <!-- Placeholder per Hero Album -->
              <div class="album-hero mb-5">
                <div class="alert alert-secondary" role="alert">
                  <i class="fas fa-compact-disc me-2"></i>
                  <strong>Sezione Hero Album:</strong> Cover, titolo, artista,
                  anno, durata totale
                </div>
              </div>

              <!-- Placeholder per Lista Brani -->
              <div class="album-tracklist mb-5">
                <div class="alert alert-secondary" role="alert">
                  <i class="fas fa-list-ol me-2"></i>
                  <strong>Lista Tracce:</strong> Tabella con numero, titolo,
                  durata, pulsante play
                </div>
              </div>

              <!-- Placeholder per Altri Album -->
              <div class="more-albums">
                <div class="alert alert-secondary" role="alert">
                  <i class="fas fa-music me-2"></i>
                  <strong>Altri Album dell'Artista:</strong> Carousel o griglia
                  di album correlati
                </div>
              </div>
            </div>
          </div>
	  `
}
