import type { Pokemon } from "../models/Pokemon";
import { capitalize } from "../helpers/capitalize";
import type { DisplayPokemon } from "../models/DisplayPokemon";

export const processPokemon = (response: Pokemon) => {
    const pokemon: DisplayPokemon = {
        name: capitalize(response.name),
        art: response.sprites.other['official-artwork'].front_default
    }
    return pokemon
}
// will get more information on subsequent updates