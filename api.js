//https://striveschool-api.herokuapp.com/api/deezer/album/75621062
let currentAlbum;
const getAlbum = async function (id) {
  await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`[${res.status}] http status not ok`);
      return res.json();
    })
    .then((data) => {
      currentAlbum = data;
    })
    .catch((err) => {
      console.error(`encountered error: ${err}`);
    });
};
