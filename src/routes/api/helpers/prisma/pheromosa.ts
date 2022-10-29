import type { Display } from '@prisma/client';
import { capitalize } from '../../../../helpers/capitalize';
import { fetchPokemonData } from '../fetchPokemonData';
import { prismatic } from './primsa';

export async function pheromosa(pokemon: string) {
	if (!pokemon) {
		throw Error;
	}
	let body = {} as Display;
	try {
		let checkIfAlreadyIn = await prismatic.display.findFirst({
			where: {
				name: {
					equals: capitalize(pokemon)
				}
			}
		});
		if (!checkIfAlreadyIn) {
			checkIfAlreadyIn = await prismatic.display.findFirst({
				where: {
					name: {
						contains: capitalize(pokemon)
					}
				}
			});
		}
		if (checkIfAlreadyIn) {
			body = checkIfAlreadyIn;
			return {
				body
			};
		}
		if (!checkIfAlreadyIn) {
			const pokemonData = await fetchPokemonData(pokemon);
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
