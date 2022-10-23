import { uncapitalize } from "../helpers/uncapitalize"
import { processPokemon } from "./processPokemon"

export const getPokemon = async (pokemon: string) => {
    const searchedPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + uncapitalize(pokemon))
    const pokemonJson = await searchedPokemon.json()
    return processPokemon(pokemonJson)
}