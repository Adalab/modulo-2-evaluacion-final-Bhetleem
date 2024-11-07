'use strict';

const inputText = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-searchButton");
const searchList = document.querySelector(".js-searchList");

function getSeries(ev) {
    ev.preventDefault();
      //console.log("Ha hecho click");
      //console.log(inputText.value);
    fetch(`https://api.jikan.moe/v4/anime?q=${inputText.value}`)
    .then((response) => response.json())
    .then(data => {
        const series = data.data;

       // console.log(series);

    })
}


searchButton.addEventListener('click', getSeries);




