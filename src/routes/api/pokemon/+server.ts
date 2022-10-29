import type { Display } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
import type { DisplayPokemon } from 'src/models/DisplayPokemon';
import { pheromosa } from '../helpers/prisma/pheromosa';
import { pheremosaRandom } from '../helpers/prisma/random';

export async function GET({ url }: RequestEvent) {
	const pokemon = url.searchParams.get('pokemon');
	const randomPokemon = url.searchParams.get('random');
	if (!pokemon) throw Error;
	let pokemonArr: string[] = [];
	if (pokemon.includes(',')) {
		pokemonArr = pokemon.split(',');
	} else pokemonArr.push(pokemon);
	let favList: Array<DisplayPokemon> = [];
	for (let i = 0; i < pokemonArr.length; i++) {
		if (randomPokemon) {
			const pokemonData = await pheremosaRandom(Number(pokemonArr[i]));
			if (!pokemonData || !pokemonData.body) throw Error;
			const pokemonJson: Display = pokemonData.body;
			favList = [...favList, pokemonJson];
		} else {
			const pokemonData = await pheromosa(pokemonArr[i]);
			if (!pokemonData || !pokemonData.body) throw Error;
			const pokemonJson: Display = pokemonData.body;
			favList = [...favList, pokemonJson];
		}
	}
	return new Response(JSON.stringify(favList));
}
