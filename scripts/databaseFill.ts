
import { processPokemon } from "../src/api/processPokemon"
import { DisplayPokemon } from "../src/models/DisplayPokemon"

export async function databaseFill() {
    const regularDexRange = [1, 906]
    const formsRange = [10001, 10249]

    let DisplayPokemonArr: Array<DisplayPokemon> = []
    for (let i = 1; i < regularDexRange[1]; i++){
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemonJson = await pokemon.json()
        const DisplayPokemon = await processPokemon(pokemonJson)
        DisplayPokemonArr = [...DisplayPokemonArr, DisplayPokemon]
    }
    for (let i = 1; i < formsRange[1]; i++){
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemonJson = await pokemon.json()
        const DisplayPokemon = await processPokemon(pokemonJson)
        DisplayPokemonArr = [...DisplayPokemonArr, DisplayPokemon]
    }

    // do something with database
}

databaseFill()