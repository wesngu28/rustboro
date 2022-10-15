import { errorHandler, statusCheck } from "./apiResponse.js";
import { capitalize } from "./helper/capitalize.js";

export async function unhidePersonal() {
    const PERSONAL_SIX = ['94', '471', '382', '282', '609', '169']
    for (let i = 0; i < 6; i++) {
        try {
            const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + PERSONAL_SIX[i])
            statusCheck(pokemon)
            const pokemonJson = await pokemon.json()
            displayPersonal(pokemonJson, i)
        } catch (err) {
            errorHandler(err)
        }
    }
    let hiddens = document.querySelectorAll('.hidden');
    for (let i = 0; i < hiddens.length; i++) {
        hiddens[i].classList.remove('hidden');
    }
    document.getElementById('other-btn').disabled = true;
}

function displayPersonal(response, i) {
    let figures = document.querySelectorAll('figure');
    let officialart = document.createElement('img');
    officialart.src = response['sprites']['other']['official-artwork']['front_default'];
    figures[i].appendChild(officialart);

    let pokemon = document.createElement('figcaption');
    let pkmnname = response.name;
    pokemon.textContent = capitalize(pkmnname);
    figures[i].appendChild(pokemon);
}