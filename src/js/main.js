'use strict';

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
    .then(data => {
        const series = data.data;
        //console.log(Series);
        searchList.innerHTML = "";
        for (const serie of series) {
        //console.log(serie.title);

            let imageURL = serie.images.jpg.image_url;
            if (imageURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){
                imageURL = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
            }

            searchList.innerHTML += `
            <li class="js-li serieCard" id=${serie.mal_id}>
            <img class="js-image" src="${imageURL}" alt="${serie.title}">
            <h5 class="js-serieTitle">${serie.title}</h5>
            </li>
            `;
        seriesList.push(serie);

        const allSeriesDOM = document.querySelectorAll(".js-li");
        for (const serieDOM of allSeriesDOM){
            serieDOM.addEventListener("click", handleAddFavourite);
        }
        }
    })
    }

    searchButton.addEventListener('click', handleSearch);

    /* Añadir a favoritos */ 
     
    let favouriteSerieList = [];
    let savedFavourites = JSON.parse(localStorage.getItem("favouritesLocalStorage"));
    

    function handleAddFavourite(event){
                //console.log("hello");
            const idCardFavouriteSelected = event.currentTarget.id;
            const favouriteCardSelected = seriesList.find((serie) => {
                //console.log(idCardFavouriteSelected);
                //console.log(serie.mal_id);
            return serie.mal_id === parseInt(idCardFavouriteSelected);
        })
        favouriteSerieList.push(favouriteCardSelected);  
                //console.log(favouriteSerieList);
        favouriteList.innerHTML += `
        <li class="serieCard">
        <img class="js-fav-image" src="${favouriteCardSelected.images.jpg.image_url}" alt="${favouriteCardSelected.title}">
        <h5 class="js-fav-serieTitle">${favouriteCardSelected.title}</h5>
        </li>
        `;

        localStorage.setItem("favouritesLocalStorage", JSON.stringify(favouriteSerieList));
        savedFavourites = JSON.parse(localStorage.getItem("favouritesLocalStorage"));
                //console.log(savedFavourites);
}

    /* --- Pintar desde localStorage --- */
if (savedFavourites !== null){
    for(const favourite of savedFavourites){
        console.log(favourite);
        favouriteList.innerHTML += `
        <li class="serieCard">
        <img class="js-fav-image" src="${favourite.images.jpg.image_url}" alt="${favourite.title}">
        <h5 class="js-fav-serieTitle">${favourite.title}</h5>
        </li>
        `;
        
    }
    
}
    

    

    /* --- Reset ---*/

    function resetClick() {
        seriesList = [];
        favouriteSerieList = [];
    }
    resetButton.addEventListener("click", resetClick)

    









