const Search = function () {
  return `
          <div class="content-wrapper p-4">
            <!-- Header con navigazione -->
            <div class="content-header d-flex justify-content-between align-items-center mb-4">
              <div class="nav-arrows">
                <button onclick="indietro()" class="btn btn-dark rounded-circle me-2" title="Torna indietro" aria-label="Torna indietro">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button onclick="avanti()" class="btn btn-dark rounded-circle" title="Vai avanti" aria-label="Vai avanti">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>

              <div class="user-profile d-flex align-items-center">
                <div class="dropdown">
                  <button class="btn btn-dark dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                    <div class="profile-pic bg-secondary rounded-circle me-2"></div>
                    <span>Lidia Nautilus</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- CONTENUTO SEARCH PAGE -->
            <div class="search-page-content">
              <!-- Search Bar -->
              <div class="search-bar-section mb-5">
                <div class="input-group input-group-lg">
                  <span class="input-group-text bg-dark border-0" onclick="cerca()" style="cursor: pointer;">
                    <i class="fas fa-search text-white-50"></i>
                  </span>
                  <input type="text" id="searchInput" class="form-control bg-dark text-white border-0" placeholder="Cosa vuoi ascoltare?" aria-label="Cerca brani, artisti o podcast">
                </div>
              </div>
            
              <!-- browse All Categories -->
              <div class="browse-categories mb-5">
                <h2 class="h4 mb-4">Sfoglia tutto</h2>
                <div class="row g-3">
                  <!-- Category Card 1 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="category-card category-card-podcast bg-danger rounded p-3 position-relative overflow-hidden">
                      <h3 class="h5 fw-bold">Podcast</h3>
                    </div>
                  </div>

                  <!-- Category Card 2 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="category-card category-card-personal bg-primary rounded p-3 position-relative overflow-hidden">
                      <h3 class="h5 fw-bold">Per te</h3>
                    </div>
                  </div>

                  <!-- Category Card 3 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="category-card category-card-releases bg-success rounded p-3 position-relative overflow-hidden">
                      <h3 class="h5 fw-bold">Nuove uscite</h3>
                    </div>
                  </div>

                  <!-- Category Card 4 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="category-card category-card-pop bg-warning rounded p-3 position-relative overflow-hidden">
                      <h3 class="h5 fw-bold text-dark">Pop</h3>
                    </div>
                  </div>

                  <!-- Category Card 5 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="category-card category-card-hiphop bg-info rounded p-3 position-relative overflow-hidden">
                      <h3 class="h5 fw-bold">Hip-Hop</h3>
                    </div>
                  </div>

                  <!-- Category Card 6 -->
                  <div class="col-md-6 col-lg-4">
                    <div class="category-card category-card-rock border border-white rounded p-3 position-relative overflow-hidden">
                      <h3 class="h5 fw-bold">Rock</h3>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Searches (Placeholder) -->
              <div class="recent-searches">
                <div class="alert alert-secondary" role="alert">
                  <i class="fas fa-clock me-2"></i>
                  <strong>Ricerche recenti:</strong> Sezione da implementare con
                  le ultime ricerche dell'utente
                </div>
              </div>
            </div>
          </div>
        </div>
`
}

const cerca = async function () {
  let band = document.getElementById("searchInput").value
  let arr = await getResults(band)
  document.querySelector(".browse-categories").innerHTML = arr
    .map((ris) => risultatiHtml(ris))
    .join("")
}

const risultatiHtml = function (ris) {
  return `
      <div class="search-history-item" id="track-${ris.id}" onclick="loadTrackById(${ris.id})">
        <div class="search-item-content">
          <img src="${ris.album.cover_small}" alt="vhjwbiuykjhdv" class="search-item-image ">
          <div class="search-item-info">
            <span class="search-item-type">${ris.artist.name}</span>
            <p class="search-item-name">${ris.title}</p>
          </div>
	    <input type="hidden" class="track-album-id" value="${ris.album.id}">
	    <input type="hidden" class="track-preview" value="${ris.preview}">
	    <input type="hidden" class="track-id-hidden" value="${ris.id}">
	    <input type="hidden" class="track-title-hidden" value="${ris.title}">
        </div>
    `
}
