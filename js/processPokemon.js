import { capitalize } from "./helper/capitalize.js";

export function processPokemon(response) {
    let pokemon = document.createElement('p');
    let pkmnname = response.name;
    pokemon.textContent = capitalize(pkmnname);
    document.getElementById('pokemon-table').appendChild(pokemon);
    let officialart = document.createElement('img');
    officialart.src = response['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemon-table').appendChild(officialart);
}