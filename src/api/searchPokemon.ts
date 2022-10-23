import type { DisplayPokemon } from "..//models/DisplayPokemon"
import { uncapitalize } from "../helpers/uncapitalize"
import { processPokemon } from "./processPokemon"

export const getPokemon = async (pokemon: string): Promise<DisplayPokemon[]> => {
    const searchedPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + uncapitalize(pokemon))
    const pokemonJson = await searchedPokemon.json()
    const pokemonArr = [processPokemon(pokemonJson)]
    return pokemonArr
}