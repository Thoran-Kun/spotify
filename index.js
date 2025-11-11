// buonasera

let index = 0;
let pagine = [
  Home, // -> 0
  Album, // ->  1
];

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

const render = function () {
  const main = document.getElementById("main");
  main.innerHTML = pagine[index]();
};
render();
