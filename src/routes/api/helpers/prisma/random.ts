import type { Display } from '@prisma/client';
import { fetchPokemonData } from '../fetchPokemonData';
import { prismatic } from './primsa';

export async function pheremosaRandom(pokemon: number) {
	if (!pokemon) {
		throw Error;
	}
	let body = {} as Display;
	try {
		const checkIfAlreadyIn = await prismatic.display.findFirst({
			where: {
				id: {
					equals: pokemon
				}
			}
		});
		if (checkIfAlreadyIn) {
			body = checkIfAlreadyIn;
			return {
				body
			};
		}
		if (!checkIfAlreadyIn) {
			const pokemonData = await fetchPokemonData(String(pokemon));
			body = await prismatic.display.create({
				data: {
					...pokemonData
				}
			});
			return {
				body
			};
		}
	} catch (err: any) {
		console.log(err.message);
		return {
			error: 'An error was encountered processing your request.'
		};
	}
}
