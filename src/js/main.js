"use strict";

const inputText = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-searchButton");
const searchList = document.querySelector(".js-searchList");
const image = document.querySelector(".js-image");
const serieTitle = document.querySelector(".js-serieTitle");
let favouriteList = document.querySelector(".js-favouritesList");
const resetButton = document.querySelector(".js-resetButton");

let seriesList = [];

/* Busqueda de series */

function handleSearch(ev) {
  ev.preventDefault();
  //console.log("Ha hecho click");
  //console.log(inputText.value);
  fetch(`https://api.jikan.moe/v4/anime?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      const series = data.data;
      //console.log(Series);
      searchList.innerHTML = "";
      for (const serie of series) {
        //console.log(serie.title);

        let imageURL = serie.images.jpg.image_url;
        if (
          imageURL ===
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ) {
          imageURL =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        searchList.innerHTML += `
            <li class="js-li favourite serieCard" id=${serie.mal_id}>
            <img class="js-image" src="${imageURL}" alt="${serie.title}">
            <h5 class="js-serieTitle">${serie.title}</h5>
            </li>
            `;
        seriesList.push(serie);
       

        const allSeriesDOM = document.querySelectorAll(".js-li");
        for (const serieDOM of allSeriesDOM) {
          serieDOM.addEventListener("click", handleAddFavourite);
          
        }
      }
    });
}

searchButton.addEventListener("click", handleSearch);

const favouriteStyle = document.querySelectorAll(".favourite");


/* Añadir a favoritos */

function handleAddFavourite(event) {
  //console.log("hello");
  const idCardFavouriteSelected = event.currentTarget.id;
  const favouriteCardSelected = seriesList.find((serie) => {
    return serie.mal_id === parseInt(idCardFavouriteSelected);
  });
  console.log(event.currentTarget);
  
  event.currentTarget.classList.toggle("selectedcard");
  event.currentTarget.classList.toggle("serieCard");

  const closeButton = document.querySelector(".js-closeButton");

  savedFavourites.push(favouriteCardSelected);
  //console.log(favouriteSerieList);
  favouriteList.innerHTML += `
        <li class="serieCard">
        <button class="close js-closeButton">X</button>
        <img class="js-fav-image" src="${favouriteCardSelected.images.jpg.image_url}" alt="${favouriteCardSelected.title}">
        <h5 class="js-fav-serieTitle">${favouriteCardSelected.title}</h5>
        </li>
        `;
localStorage.setItem("favouritesLocalStorage", JSON.stringify(savedFavourites));
} 

let savedFavouritesAtLS = JSON.parse(localStorage.getItem("favouritesLocalStorage"));
/* La condicion para guardar el nuevo favorito clicado por la usuaria + lo que haya en el local storage sera
    Si {savedFavouritesAtLS es distinto de null => le asigno a la variable savedFavourites el valor de AtLS}
    si no (es decir, si es nulo) entonces inicio el objeto vacío (el array []) */
let savedFavourites = savedFavouritesAtLS !== null?savedFavouritesAtLS:[]

/* --- Pintar desde localStorage --- */
if (savedFavourites !== null) {
  for (const favourite of savedFavourites) {
    console.log(favourite);
    favouriteList.innerHTML += `
        <li class="serieCard">
        <button class="close js-closeButton">X</button>
        <img class="js-fav-image" src="${favourite.images.jpg.image_url}" alt="${favourite.title}">
        <h5 class="js-fav-serieTitle">${favourite.title}</h5>
        </li>
        `;
  }
}




/* --- Reset ---*/

function resetClick() {
  seriesList = [];
  savedFavourites = [];
  localStorage.clear();
}
resetButton.addEventListener("click", resetClick);
