import type { Pokemon } from "../models/Pokemon";
import { capitalize } from "../helpers/capitalize";
import type { DisplayPokemon } from "../models/DisplayPokemon";

export const processPokemon = (response: Pokemon) => {
    let preferredArt: string
    let sprite: string
    if(response.sprites.other['official-artwork'].front_default) {
        preferredArt = response.sprites.other['official-artwork'].front_default
        if (response.sprites.versions["generation-v"]["black-white"].animated.front_default) {
            sprite = response.sprites.versions["generation-v"]["black-white"].animated.front_default
        } else {
            sprite = response.sprites.front_default
        }
    } else if (response.sprites.versions["generation-v"]["black-white"].animated.front_default) {
        preferredArt = response.sprites.versions["generation-v"]["black-white"].animated.front_default
        sprite = response.sprites.versions["generation-v"]["black-white"].animated.front_default
    } else {
        preferredArt = response.sprites.front_default
        sprite = response.sprites.front_default
    }
    const pokemon: DisplayPokemon = {
        name: capitalize(response.name),
        art: preferredArt,
        sprite: sprite,
        abilities: response.abilities,
        stats: response.stats,
        types: response.types
    }
    return pokemon
}
// will get more information on subsequent updates