import type { Pokemon } from "src/models/Pokemon"
import type { DisplayPokemon } from "../models/DisplayPokemon"
import { processPokemon } from "./processPokemon"

export const getSixRandomPokemon = async (event: Event) => {
    const clickedRegion = (event.target! as HTMLButtonElement).innerText
    const gens: {[key:string] : Array<number>} = 
    { "Kanto": [1, 152], "Johto": [152, 252], "Hoenn": [252, 387], "Sinnoh": [387, 494], "Unova": [494, 650], "Kalos": [650, 722], "Alola": [722, 810], "Galar": [810, 899], "Forms": [10001, 10250] }
    let value: Array<number> = []
    if (Object.keys(gens).includes(clickedRegion)) {
        value = gens[clickedRegion]
    }
    if (clickedRegion === 'National') value = [0, 905]
    let pokemonArray: Array<DisplayPokemon> = []
    for (let i = 0; i < 6; i++) {
        const rand = Math.floor(Math.random() * (value[1] - value[0]) + value[0]);
        const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + rand)
        const pokemonJson: Pokemon = await pokemon.json()
        pokemonArray = [...pokemonArray, processPokemon(pokemonJson)]
    }
    return pokemonArray
}