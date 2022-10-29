import { prismatic } from '../src/routes/api/helpers/prisma/primsa';
import type { DisplayPokemon } from '../src/models/DisplayPokemon';
import { fetchPokemonData } from '../src/routes/api/helpers/fetchPokemonData';

export const feedTheRoach = async () => {
	const pokemon = [1, 899];
	const forms = [10001, 10248];
	let baseDex: Array<DisplayPokemon> = [];
	for (let i = 1; i < pokemon[1]; i++) {
		const pokemonData = await fetchPokemonData(String(i));
		baseDex = [...baseDex, pokemonData as DisplayPokemon];
		console.log('we going next');
	}
	for (let i = 10001; i < forms[1]; i++) {
		const pokemonData = await fetchPokemonData(String(i));
		baseDex = [...baseDex, pokemonData as DisplayPokemon];
		console.log('we going next');
	}
	const bigDump = await prismatic.display.createMany({
		data: baseDex
	});

	console.log(`we've taken a ${bigDump}`);
};

// For whatever reason, pokemon past 898 (calyrex) and form 10247 (basculin white-striped) do not work
