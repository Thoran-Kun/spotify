// buonasera
let index = 0
let resizeTimer;
let renderTimer;


/* cordone ombellicale alla pagina di tanjin*/
const Artist = function () {
	window.location.href = `/artist.html?id=${currentAlbum.artist.id}`
}

const setPage = function (i){
	index = +i
	render()
}

let pagine = [
	Home, // -> 0
	Artist, // ->  1
	Album, // ->  2
	Search, // -> 3
]
let pagineMobile = [
	Home, // -> 0
	Artist, // ->  1
	AlbumMobile, // ->  2
	Search, // -> 3
]

const ErrorPage = function(){
	return `
	<div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-12">
          <p class="fw-bold" style="font-size: 100px">
            <i class="bi bi-exclamation-triangle"></i>error 
          </p>
 
          <p>
            restiamo a disposizione per ogni ulteriore necessità. Cordiali
            saluti, Il Team 4
          </p>
        </div>
      </div>
    </div>
`
}

const avanti = function () {
	// DANNATO JS
	index = parseInt(index)
	index += 1
	if (index >= pagine.length) index = 0
	render()
}
const indietro = function () {
	index = parseInt(index)
	index -= 1
	if (index < 0) index = pagine.length - 1
	render()
}

const loadIndex = function () {
	const params = new URLSearchParams(window.location.search)
	const page = params.get("page")
	if (page !== null) {
		index = page
	}
}

/* nel css del body c'e` un padding di 2 rem completamente random
 * questa funzione fixa il padding nel caso del mobile */
const fixPadding = function(mode) {
	const body = document.body
	switch (mode) {
		case 'm':
		case 'mobile':
		case 'phone':
		case 'small':
		case 'sm':
			/* fix mobile padding */
			body.style.padding = '0';
			break;
		case 'desktop':
		case 'computer':
		case 'lavatrice':
			/* restore old padding */
			body.style.padding = '2rem';
			break;
		default:
			console.error('unknown mode:', mode);
	}
};


const render = function () {
	clearTimeout(renderTimer);
	const main = document.getElementById("main")
	try {
		/* TODO quando `e grande telefono se siamo sotto quanti pixel del mobile */
		if (window.innerWidth < 500) {
			fixPadding('mobile');

			main.innerHTML = pagineMobile[index]()
		} else {
			fixPadding('lavatrice');
			main.innerHTML = pagine[index]()
		}
	} catch (err) {
		main.innerHTML = ErrorPage()
		clearTimeout(resizeTimer);
		renderTimer = setTimeout(() => {
			render();
		}, 1000);
	}
}

window.addEventListener('resize', function() {
	/* resize 100 ms after last window resize
	 * */
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		render();
	}, 100);
});

// update players (both mobile)
const updatePlayer = function(percent){
	try {
		const style = `linear-gradient(to right, 
	  				green 0%, 
	  				green ${percent}%, 
	  				white ${percent}%, 
	  				white 100%)`;
		 document.querySelector('.progress-fill').style.background = style

	} catch(err){}
	try {
		 document.getElementById('mini-progress').style.width = `${percent}%`
	} catch(err){}
}
const resetPlayer = function(percent){
	try {
		const style = `linear-gradient(to right, 
	  				green 0%, 
	  				green 0%, 
	  				white 100%, 
	  				white 100%)`;
		 document.querySelector('.progress-fill').style.background = style

	} catch(err){}
	try {
		 document.getElementById('mini-progress').style.width = `0%`
	} catch(err){}
}

const updateDesktopPlayerButton = function(){
	const playBtnIcon = document.querySelector('.play-pause-btn > i')
	if (audioPlayer.paused) {
		playBtnIcon.classList.remove("fa-pause");
		playBtnIcon.classList.add("fa-play");
	} else {
		playBtnIcon.classList.remove("fa-play");
		playBtnIcon.classList.add("fa-pause");
	}
}

const fixNav = function(){
	const nav = document.querySelector('.main-nav')
	nav.innerHTML = `
    <nav class="main-nav">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a onclick="setPage(0)" class="nav-link" data-page="home">
            <i class="fas fa-home me-3"></i>Home
          </a>
        </li>
        <li class="nav-item">
          <a onclick="setPage(3)" class="nav-link" data-page="search">
            <i class="fas fa-search me-3"></i>Cerca
          </a>
        </li>
        <li class="nav-item">
          <a onclick="setPage(2)" class="nav-link" data-page="album">
            <i class="fas fa-compact-disc me-3"></i>Album
          </a>
        </li>
        <li class="nav-item">
          <a onclick="setPage(1)" class="nav-link" data-page="artist">
            <i class="fas fa-microphone me-3"></i>Artista
          </a>
        </li>
      </ul>
    </nav>
`
}

const init = async function () {
	const lastAlbum = localStorage.getItem("albumId");
	if (lastAlbum !== null) {
		await setCurrentAlbum(lastAlbum)
	} else {
		await setCurrentAlbum(75621062)
	}

	await caricaNovita("rock")
	loadIndex()
	render()
	audioPlayer = document.getElementById('audioplayer');
	audioPlayer.addEventListener('timeupdate', () => {
		const percent = parseInt((audioPlayer.currentTime / audioPlayer.duration) * 100);
		updatePlayer(percent)
	});
	audioPlayer.addEventListener('ended', () => {
		resetPlayer()
	});
//
	tastoPlayDesktop = document.querySelector('.play-pause-btn')
	tastoPlayDesktop?.addEventListener('click', () => {
		togglePlay()
		updateDesktopPlayerButton()
	});


	document.addEventListener("keyup", function (event) {
		if (parseInt(index) === 3) {
			cerca()
		}
	});
	fixNav()
	//background: linear-gradient(to right, green 50%, white 50%);
	/* update player bar */
	//});
}
init()
