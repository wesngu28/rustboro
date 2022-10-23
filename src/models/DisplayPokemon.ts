import type { Ability2, Stat, Type } from "./Pokemon"

export interface DisplayPokemon {
    name: string
    art: string,
    sprite: string,
    abilities: Ability2[],
    stats: Stat[],
    types: Type[]
}