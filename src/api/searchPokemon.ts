import type { DisplayPokemon } from "..//models/DisplayPokemon"
import { fetchPokemonData } from "./fetchPokemonData";

export const getPokemon = async (pokemon: string | Array<string>): Promise<DisplayPokemon[]> => {
    if (Array.isArray(pokemon)) {
        let favList: Array<DisplayPokemon> = []
        for (let i = 0; i < pokemon.length; i++) {
            const pokemonData = await fetchPokemonData(pokemon[i])
            favList = [...favList, pokemonData]
        }
        return favList
    }
    const pokemonData = await fetchPokemonData(pokemon)
    const pokemonArr = [pokemonData]
    return pokemonArr
}