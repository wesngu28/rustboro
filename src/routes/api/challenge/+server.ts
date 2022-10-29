import { getTwoRandoms } from '../helpers/prisma/challenge';

export async function GET() {
	const pokemonArr = await getTwoRandoms();
	return new Response(JSON.stringify(pokemonArr.twoRandArr));
}
