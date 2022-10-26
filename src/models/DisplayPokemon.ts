export interface DisplayPokemon {
    id: number,
    name: string,
    art: string | null | undefined,
    sprite: string | null | undefined,
    abilities: string[],
    stats: string[],
    types: string[],
    title: string,
    blurb: string,
    varieties: string[]
    evolution: string[]
}