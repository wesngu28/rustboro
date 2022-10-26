import { PokemonClient } from 'pokenode-ts';
import { uncapitalize } from "../helpers/uncapitalize"
import { processPokemon } from "./processPokemon"
import type { EvolutionChain } from "../models/EvolutionChain";

export const fetchPokemonData = async(pokemon: string | number) => {
    const pokemonClient = new PokemonClient()
    const searchedPokemon = await pokemonClient.getPokemonByName(uncapitalize(String(pokemon)))
    const searchedPokemonSpecies = await pokemonClient.getPokemonSpeciesByName(uncapitalize(String(pokemon)))
    const evoResponse = await fetch(searchedPokemonSpecies.evolution_chain.url)
    const pokemonEvolution: EvolutionChain = await evoResponse.json()
    const pokemonData = await processPokemon(searchedPokemon, searchedPokemonSpecies, pokemonEvolution)
    return pokemonData
}