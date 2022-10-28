import { getTwoRandoms } from '../helpers/prisma/rockroach';

export async function GET() {
	const pokemonArr = await getTwoRandoms();
	return new Response(JSON.stringify(pokemonArr.twoRandArr));
}
