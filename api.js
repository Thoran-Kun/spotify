//https://striveschool-api.herokuapp.com/api/deezer/album/75621062
let currentAlbum
let novita

const caricaNovita = async function(query){
	novita = await getResults(query)
	render()
}

const setCurrentAlbum = async function(id){
	currentAlbum = await getAlbum(id)
	render()
}

const getAlbum = async function (id) {
	let album ;
	await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`, {
		method: "GET",
	})
		.then((res) => {
			if (!res.ok) throw new Error(`[${res.status}] http status not ok`)
			return res.json()
		})
		.then((data) => {
			album = data
		})
		.catch((err) => {
			console.error(`encountered error: ${err}`)
		})
	return album
}

let currentResults

const getResults = async function (ricerca) {
	let results = []
	await fetch(
		`https://striveschool-api.herokuapp.com/api/deezer/search?q=${ricerca}`,
		{
			method: "GET",
		}
	)
		.then((res) => {
			if (!res.ok) throw new Error(`[${res.status}] http status not ok`)
			return res.json()
		})
		.then((data) => {
			results = [...data['data']];	
		})
		.catch((err) => {
			console.error(`encountered error: ${err}`)
		})
	return results
}
