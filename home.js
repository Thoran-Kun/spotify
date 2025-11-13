const Home = function () {
  const image = (novita?.[0])? novita[0].album.cover:"assets/imgs/main/image-1.jpg"
  const title = (novita?.[0])? novita[0].title:"VIOLA (feat. Salmo)"
  const artist = (novita?.[0])? novita[0].artist.name:"Fedez, Salmo"
  return `
          <div class="content-wrapper p-4">
            <!-- Header con navigazione -->
            <div
              class="content-header d-flex justify-content-between align-items-center mb-4"
            >
              <div class="nav-arrows">
                <button
                  class="btn btn-dark rounded-circle me-2"
                  title="Go back"
                  onclick="indietro()"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="btn btn-dark rounded-circle"  
                onclick="avanti()"
                title="Go forward">
                  <i class="fas fa-chevron-right"></i>
                
                </button>
              </div>

              <div class="user-profile">
                <button class="btn btn-dark d-flex align-items-center">
                  <div
                    class="profile-pic bg-secondary rounded-circle me-2"
                  ></div>
                  <span>Lidia Nautilus</span>
                  <i class="fas fa-caret-down ms-2"></i>
                </button>
              </div>
            </div>

            <!-- Album in evidenza -->
            <div class="featured-album mb-4">
              <div class="featured-album-content">
                <div class="featured-album-badge-top">
                  <span class="hide-ads">NASCONDI ANNUNCI</span>
                </div>
                <div class="row align-items-end">
                  <div class="col-auto">
                    <img
                      src="${image}"
                      class="album-cover"
                    />
                  </div>
                  <div class="col">
                    <div class="album-info">
                      <span class="album-badge">ALBUM</span>
                      <h1 class="album-title">${title}</h1>
                      <p class="album-artist mb-2">${artist}</p>
                      <p class="album-description mb-3">
                        Ascolta il nuovo singolo di Fedez e Salmo!
                      </p>
                      <div class="d-flex align-items-center gap-3">
                        <button
                          class="btn btn-success btn-lg rounded-pill px-4"
                        >
                          <i class="fas fa-play me-2"></i>Play
                        </button>
                        <button
                          class="btn btn-outline-light btn-lg rounded-pill px-4"
                        >
                          Salva
                        </button>
                        <button
                          class="btn btn-link text-white-50 p-0"
                          title="More options"
                        >
                          <i class="fas fa-ellipsis-h fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sezione Buonasera -->
            <section class="good-evening mb-5">
              <h2 class="section-title mb-3">Buonasera</h2>
              <div class="row g-3">
                <!-- Card 1 -->
		${playlistCard(novita)}

                <!-- Card 2 -->
		${playlistCard(novita, 3)}

                <!-- Card 3 -->
		${playlistCard(novita, 7)}

                <!-- Card 4 - Brani che ti piacciono -->
                <div class="col-4">
                  <div class="playlist-card">
                    <div class="d-flex align-items-center">
                      <div class="playlist-icon">
                        <i class="fas fa-heart"></i>
                      </div>
                      <div class="playlist-info">
                        <h6 class="playlist-title">Brani che ti piacciono</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card 5 -->
                <div class="col-4">
                  <div class="playlist-card">
                    <div class="d-flex align-items-center">
                      <div class="playlist-img-grid">
                        <img src="assets/imgs/main/image-14.jpg" alt="" />
                        <img src="assets/imgs/main/image-15.jpg" alt="" />
                        <img src="assets/imgs/main/image-16.jpg" alt="" />
                        <img src="assets/imgs/main/image-17.jpg" alt="" />
                      </div>
                      <div class="playlist-info">
                        <h6 class="playlist-title">2021 lol</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card 6 -->
                <div class="col-4">
                  <div class="playlist-card">
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/imgs/main/image-18.jpg"
                        alt="Deep Dive with Ali Abdaal"
                        class="playlist-img"
                      />
                      <div class="playlist-info">
                        <h6 class="playlist-title">
                          Deep Dive with Ali Abdaal
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Sezione "Altro di ciò che ti piace" -->
            <section class="recommendations">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h2 class="section-title mb-0">Altro di ciò che ti piace</h2>
                <a href="#" class="show-all">VISUALIZZA TUTTO</a>
              </div>

              <div class="row row-cols-5 g-3">
                <!-- Rec 1 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-1.jpg"
                        alt="Hot Hits Italia"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Hot Hits Italia</h6>
                    <p class="recommendation-desc">
                      La playlist più calda del...
                    </p>
                  </div>
                </div>

                <!-- Rec 2 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-6.jpg"
                        alt="big on the internet"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">big on the internet</h6>
                    <p class="recommendation-desc">iyiyk</p>
                  </div>
                </div>

                <!-- Rec 3 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-8.jpg"
                        alt="Pop Rising"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Pop Rising</h6>
                    <p class="recommendation-desc">
                      The hits of tomorrow are on...
                    </p>
                  </div>
                </div>

                <!-- Rec 4 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-12.jpg"
                        alt="Canzoni Tristi"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Canzoni Tristi</h6>
                    <p class="recommendation-desc">It's ok not to be ok :'(</p>
                  </div>
                </div>

                <!-- Rec 5 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-19.jpg"
                        alt="in tendenza"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">in tendenza</h6>
                    <p class="recommendation-desc">
                      Viral & Trending: le canzoni
                    </p>
                  </div>
                </div>

                <!-- Rec 6 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-2.jpg"
                        alt="Indie Italia"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Indie Italia</h6>
                    <p class="recommendation-desc">
                      I migliori artisti indie italiani
                    </p>
                  </div>
                </div>

                <!-- Rec 7 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-3.jpg"
                        alt="Rock Classics"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Rock Classics</h6>
                    <p class="recommendation-desc">
                      Rock legends and epic guitar riffs
                    </p>
                  </div>
                </div>

                <!-- Rec 8 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-4.jpg"
                        alt="Chill Vibes"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Chill Vibes</h6>
                    <p class="recommendation-desc">
                      Kick back to the best new and recent chill hits
                    </p>
                  </div>
                </div>

                <!-- Rec 9 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-5.jpg"
                        alt="Jazz Vibes"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Jazz Vibes</h6>
                    <p class="recommendation-desc">
                      The original chill instrumental music
                    </p>
                  </div>
                </div>

                <!-- Rec 10 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-7.jpg"
                        alt="Workout"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Workout</h6>
                    <p class="recommendation-desc">
                      Get your sweat on with these tracks
                    </p>
                  </div>
                </div>

                <!-- Rec 11 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-9.jpg"
                        alt="Electronic Hits"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Electronic Hits</h6>
                    <p class="recommendation-desc">
                      Dance beats and electronic vibes
                    </p>
                  </div>
                </div>

                <!-- Rec 12 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-10.jpg"
                        alt="Acoustic"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Acoustic</h6>
                    <p class="recommendation-desc">Beautiful acoustic covers</p>
                  </div>
                </div>

                <!-- Rec 13 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-11.jpg"
                        alt="Hip Hop"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Hip Hop</h6>
                    <p class="recommendation-desc">
                      The hottest tracks in hip hop
                    </p>
                  </div>
                </div>

                <!-- Rec 14 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-13.jpg"
                        alt="Pop Italia"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Pop Italia</h6>
                    <p class="recommendation-desc">
                      Il meglio del pop italiano
                    </p>
                  </div>
                </div>

                <!-- Rec 15 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-14.jpg"
                        alt="Latin Hits"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Latin Hits</h6>
                    <p class="recommendation-desc">
                      Los éxitos latinos del momento
                    </p>
                  </div>
                </div>

                <!-- Rec 16 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-15.jpg"
                        alt="Country Roads"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Country Roads</h6>
                    <p class="recommendation-desc">
                      Classic and modern country music
                    </p>
                  </div>
                </div>

                <!-- Rec 17 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-16.jpg"
                        alt="R&B Soul"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">R&B Soul</h6>
                    <p class="recommendation-desc">
                      Smooth R&B and soulful tunes
                    </p>
                  </div>
                </div>

                <!-- Rec 18 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-17.jpg"
                        alt="Classical"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Classical</h6>
                    <p class="recommendation-desc">
                      Timeless classical masterpieces
                    </p>
                  </div>
                </div>

                <!-- Rec 19 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-18.jpg"
                        alt="Alternative Rock"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Alternative Rock</h6>
                    <p class="recommendation-desc">
                      The best alternative rock anthems
                    </p>
                  </div>
                </div>

                <!-- Rec 20 -->
                <div class="col">
                  <div class="recommendation-card">
                    <div class="recommendation-img-wrapper">
                      <img
                        src="assets/imgs/main/image-1.jpg"
                        alt="Party Mix"
                        class="recommendation-img"
                      />
                    </div>
                    <h6 class="recommendation-title">Party Mix</h6>
                    <p class="recommendation-desc">
                      Turn up the volume and dance all night
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
	`;
};

const playlistCard = function(data, index=0){
	let images = []
	/* TODO index out of range */

	/* TODO fixare 
	 * TypeError: Cannot read properties of undefined (reading 'album')
         * at playlistCard (home.js:506:31)
    	 * at Array.Home (home.js:89:5)
         * at render (index.js:44:32)
         * at <anonymous>:1:1
	 * */
	/* questo carica le image di failback*/
	for (let i = 1; i <= 19; i++) {
		images.push(`assets/imgs/main/image-${i}.jpg`)
	}

	/* cambia l'immagine se esiste nell'array dato*/
	data?.forEach((data, i) => {
		images[i] = data.album.cover_small
	})

	return `
                <div class="col-4">
                  <div class="playlist-card">
                    <div class="d-flex align-items-center">
                      <div class="playlist-img-grid">
                        <img src="${images[index+0]}" alt="" />
                        <img src="${images[index+1]}" alt="" />
                        <img src="${images[index+2]}" alt="" />
                        <img src="${images[index+3]}" alt="" />
                      </div>
                      <div class="playlist-info">
                        <h6 class="playlist-title">
                          early stage emily syndrome
                        </h6>
                        <small class="playlist-subtitle">(sett-ott 2022)</small>
                      </div>
                    </div>
                  </div>
                </div>
	`
}

/* on resize */
