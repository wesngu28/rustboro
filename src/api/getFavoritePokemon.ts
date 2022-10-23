import type { DisplayPokemon } from "../models/DisplayPokemon";
import type { Pokemon } from "../models/Pokemon";
import { processPokemon } from "./processPokemon";

export const getFavoritePokemon = async (favArr: Array<string>) => {
    let favList: Array<DisplayPokemon> = []
    for (let i = 0; i < favArr.length; i++) {
        const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + favArr[i])
        const pokemonJson: Pokemon = await pokemon.json()
        favList = [...favList, processPokemon(pokemonJson)]
    }
    return favList
}