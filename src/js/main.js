'use strict';

const inputText = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-searchButton");
const searchList = document.querySelector(".js-searchList");
const image = document.querySelector(".js-image");
const serieTitle = document.querySelector(".js-serieTitle");

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
        for (const serie of series) {
            console.log(serie.title);
            // if
            searchList.innerHTML += `
            <li>
            <img class="js-image" src="${serie.images.jpg.image_url}" alt="${serie.title}">
            <h5 class="js-serieTitle">${serie.title}</h5>
            </li>
            `;
            
        }
    })
}

searchButton.addEventListener('click', handleSearch);




