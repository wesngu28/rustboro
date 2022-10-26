export interface DisplayPokemon {
    id: number
    name: string
    art: string,
    sprite: string,
    abilities: Ability[],
    stats: string[],
    types: string[],
    title: string,
    blurb: string,
    varieties: string[]
    evolution: string[]
}

export interface Ability {
    name: string
    hidden: boolean
}