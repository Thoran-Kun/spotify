// buonasera
let index = 0
let resizeTimer;


/* cordone ombellicale alla pagina di tanjin*/
const Artist = function () {
	window.location.href = `/artist.html?id=${currentAlbum.artist.id}`
}

const setPage = function (i){
	index = i
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

const avanti = function () {
	index += 1
	if (index >= pagine.length) index = 0
	render()
}
const indietro = function () {
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
			/* restore old padding */
			body.style.padding = '2rem';
			break;
		default:
			console.error('unknown mode:', mode);
	}
};


const render = function () {
	const main = document.getElementById("main")
	try {
		/* TODO quando `e grande telefono se siamo sotto quanti pixel del mobile */
		if (window.innerWidth < 500) {
			fixPadding('mobile');

			main.innerHTML = pagineMobile[index]()
		} else {
			fixPadding('desktop');
			main.innerHTML = pagine[index]()
		}
	} catch (err) {
		console.log(err)
		// FIXME pagina ops qualcosa `e andato storto
		console.error("qualcosa e` andato storto")
	}
}

document.addEventListener("keydown", (e) => {
	cerca()
});

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

const init = async function () {
	await setCurrentAlbum(75621062)
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
	//background: linear-gradient(to right, green 50%, white 50%);
	/* update player bar */
	//});
}
init()
