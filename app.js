const img = document.querySelector("img");
const query = document.querySelector("#query");
const findBtn = document.querySelector("#find-button");

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

findBtn.addEventListener("click", getPokemon);

function getPokemon() {
    let fullUrl = baseUrl;
    if (query.value.trim !== "") {
        fullUrl += query.value.toLowerCase();
    } else {
        fullUrl += 'pikachu';
    }
    fetch(fullUrl, {mode: 'cors'})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.sprites.front_default);
        img.src = data.sprites.front_default;
    })
    .catch(function (error) {
        console.log(error);
    });
}

