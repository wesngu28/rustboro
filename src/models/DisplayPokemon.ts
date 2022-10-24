import type { Evolution } from "./EvolutionChain"
import type { Ability2, Stat, Type } from "./Pokemon"
import type { text } from "./PokemonSpecies"

export interface DisplayPokemon {
    id: number
    name: string
    art: string,
    sprite: string,
    abilities: Ability2[],
    stats: Stat[],
    types: Type[],
    title: string,
    blurb: string,
    varieties: text[]
    evolution: string[]
}