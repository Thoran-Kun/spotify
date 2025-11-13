// buonasera
let index = 0;

const Artist = function(){
	window.location.href = `/artist.html?id=${currentAlbum.artist.id}`;
}

let pagine = [
  Home, // -> 0
  Artist, // ->  1
  Album, // ->  2
];
// artist?id=1231293



const avanti = function () {
  index += 1;
  if (index >= pagine.length) index = 0;
  render();
};
const indietro = function () {
  index -= 1;
  if (index < 0) index = pagine.length - 1;
  render();
};


const loadIndex = function (){
	const params = new URLSearchParams(window.location.search);
	const page = params.get('page');
	if (page !== null) {
		index = page;
	} 
}

const render = function () {
  
  const main = document.getElementById("main");
  try{ 
	main.innerHTML = pagine[index]();
  } catch(err){
	  console.log(err)
	// FIXME pagina ops qualcosa `e andato storto
	console.error('qualcosa e` andato storto');
  }
};
const init = async function(){
	await setCurrentAlbum(75621062);
	await caricaNovita('rock')
	loadIndex();
	render();
}
init()


