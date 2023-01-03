const query = document.querySelector("#query");
const findBtn = document.querySelector("#find-button");
const pokeContainer = document.querySelector(".pokemon-container");

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

findBtn.addEventListener("click", getPokemon);

async function getPokemon() {
    let fullUrl = baseUrl;
    if (query.value.trim !== "") {
        fullUrl += query.value.toLowerCase();
    } else {s
        fullUrl += 'pikachu';
    }
    try {
        const response = await fetch(fullUrl, { mode: 'cors' });
        const data = await response.json();
        setPokemonData(data);
        query.value = "";
    } catch (error) {
        setErrorMessage();
    }
   
}

function setPokemonData(data) {
    pokeContainer.replaceChildren();
    const h2 = document.createElement("h2");
    h2.textContent = data.name;
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    imgContainer.append(img);
    const dexNumber = document.createElement("p");
    dexNumber.textContent = "Pokedex number: " + data.id;
    const typesList = document.createElement("ul");
    typesList.textContent = "Type(s):";
    data.types.forEach(t => {
        const listItem = document.createElement("li");
        listItem.textContent = t.type.name;
        typesList.append(listItem);
    });
    pokeContainer.append(h2, imgContainer, dexNumber, typesList);
}

function setErrorMessage() {
    const h2 = document.createElement("h2");
    h2.textContent = "Something went wrong. Please try again.";
    h2.classList.add("error");
    pokeContainer.replaceChildren(h2);
}

