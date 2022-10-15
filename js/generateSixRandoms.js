import { errorHandler, statusCheck } from "./apiResponse.js";
import { display } from "./display.js";
import { maximum } from "./findMaximum.js";
import { minimum } from "./findMinimum.js";
import { processPokemon } from "./processPokemon.js";

export async function sixRandoms(activeSlide) {
    const gens = { kanto: [1, 152], johto: [152, 252], hoenn: [252, 387], sinnoh: [387, 494], unova: [494, 650], kalos: [650, 722], alola: [722, 810], galar: [810, 899] }
    let oldPokemonName = document.querySelectorAll('#pokemon-table p');
    let oldPokemonImage = document.querySelectorAll('#pokemon-table img');
    for (let i = 0; i < oldPokemonName.length; i++) {
        oldPokemonName[i].parentNode.removeChild(oldPokemonName[i]);
        oldPokemonImage[i].parentNode.removeChild(oldPokemonImage[i]);
    }
    for (let i = 0; i < 6; i++) {
        let rand = Math.floor(Math.random() * (maximum(gens) - minimum(gens)) + minimum(gens));
        try {
            const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + rand)
            statusCheck(pokemon)
            const pokemonJson = await pokemon.json()
            processPokemon(pokemonJson, activeSlide)
            display()
        } catch (err) {
            errorHandler(err)
        }
    }
}