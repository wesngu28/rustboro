import { error } from '@sveltejs/kit';
import type { DisplayPokemon } from 'src/models/DisplayPokemon';
import type { RequestEvent } from '../../../../.svelte-kit/types/src/routes/api/pokemon/$types';
import { fetchPokemonData } from '../helpers/fetchPokemonData';

export async function GET({ url }: RequestEvent) {
    const pokemon = url.searchParams.get('pokemon')
    if(!pokemon) throw error(400, 'No pokemon passed')
    let pokemonArr: string[] = []
    if (pokemon.includes(',')) { pokemonArr = pokemon.split(',') }
    else pokemonArr.push(pokemon)
    console.log(pokemon)
    let favList: Array<DisplayPokemon> = []
    for (let i = 0; i < pokemonArr.length; i++) {
        const pokemonData = await fetchPokemonData(pokemonArr[i])
        favList = [...favList, pokemonData]
    }
    return new Response(JSON.stringify(favList))
}
