import type { Display } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';
import type { DisplayPokemon } from 'src/models/DisplayPokemon';
import { rockroach } from '../helpers/prisma/rockroach';

export async function GET({ url }: RequestEvent) {
	const pokemon = url.searchParams.get('pokemon');
	if (!pokemon) throw error(400, 'No pokemon passed');
	let pokemonArr: string[] = [];
	if (pokemon.includes(',')) {
		pokemonArr = pokemon.split(',');
	} else pokemonArr.push(pokemon);
	let favList: Array<DisplayPokemon> = [];
	for (let i = 0; i < pokemonArr.length; i++) {
		const pokemonData = await rockroach(pokemonArr[i]);
		if (!pokemonData || !pokemonData.body) throw Error;
		const pokemonJson: Display = pokemonData.body;
		favList = [...favList, pokemonJson];
	}
	return new Response(JSON.stringify(favList));
}
