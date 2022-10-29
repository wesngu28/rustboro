import type { Pokemon } from '../../../models/Pokemon';
import { capitalize } from '../../../helpers/capitalize';
import type { DisplayPokemon } from '../../../models/DisplayPokemon';
import type { PokemonSpecies } from '../../../models/PokemonSpecies';
import type { ChainLink, EvolutionChain } from '../../../models/EvolutionChain';
import { capitalizeAndRemove } from '../../../helpers/capitalizeAndRemove';

export const processPokemon = async (
	response: Pokemon,
	species: PokemonSpecies,
	evolutionChain: EvolutionChain
) => {
	let sprite = response.sprites.front_default;
	if (!sprite) sprite = 'headerBall.png';
	let preferredArt = response.sprites.other?.['official-artwork'].front_default;
	if (!preferredArt) {
		if (response.sprites.front_default) preferredArt = response.sprites.front_default;
		else preferredArt = 'headerBall.png';
	}
	const findEnglishGenus = species.genera.filter((p) => p.language.name === 'en');
	const badlyPunctuatedOrCase = [
		'red',
		'blue',
		'yellow',
		'gold',
		'silver',
		'crystal',
		'ruby',
		'sapphire',
		'emerald',
		'firered',
		'leafgreen',
		'diamond',
		'pearl',
		'platinum',
		'heartgold',
		'soulsilver'
	];
	const findEnglishFlavor = species.flavor_text_entries.filter(
		(p) =>
			p.language.name === 'en' &&
			p.version?.name &&
			!badlyPunctuatedOrCase.includes(p.version?.name)
	);
	const findVarieties = species.varieties.filter((p) => p.is_default === false);
	const usefulVariety = findVarieties.map((v) => {
		const evoSprite = v.pokemon.url
			.replace('https://pokeapi.co/api/v2/pokemon/', '')
			.replace('/', '');
		return `${capitalizeAndRemove(v.pokemon.name)},${
			v.pokemon.url
		},https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoSprite}.png`;
	});
	let evolutions: string[] = [];
	const evoSprite = evolutionChain.chain.species.url
		.replace('https://pokeapi.co/api/v2/pokemon-species/', '')
		.replace('/', '');
	evolutions = [
		...evolutions,
		`${evolutionChain.chain.species.name},${evolutionChain.chain.species.url.replace(
			'-species',
			''
		)},https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoSprite}.png`
	];
	const digDeeper = async (evolutionTree: ChainLink[]) => {
		if (!evolutionTree[0]) return;
		if (evolutionTree.length > 1) return;
		const evoSprite = evolutionTree[0].species.url
			.replace('https://pokeapi.co/api/v2/pokemon-species/', '')
			.replace('/', '');
		evolutions = [
			...evolutions,
			`${evolutionTree[0].species.name},${evolutionTree[0].species.url.replace(
				'-species',
				''
			)},https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoSprite}.png`
		];
		if (Object.keys(evolutionTree[0]).includes('evolves_to')) {
			digDeeper(evolutionTree[0].evolves_to);
		}
	};
	await digDeeper(evolutionChain.chain.evolves_to);
	evolutions = evolutions.map((e: string) => {
		return capitalize(e);
	});
	let abilities: string[] = [];
	response.abilities.forEach((ability) => {
		if (ability.is_hidden) abilities = [...abilities, `${ability.ability.name} (H)`];
		else abilities = [...abilities, ability.ability.name];
	});
	let types: string[] = [];
	response.types.forEach((type) => {
		types = [...types, type.type.name];
	});
	const stats: string[] = response.stats.map((stat) => {
		return `${stat.stat.name}:${stat.base_stat}`;
	});
	const pokemon: DisplayPokemon = {
		id: response.id,
		name: capitalize(response.name),
		art: preferredArt,
		sprite: sprite,
		abilities: abilities,
		stats: stats,
		types: types,
		title: findEnglishGenus[0].genus,
		blurb: findEnglishFlavor[0].flavor_text,
		varieties: usefulVariety,
		evolution: evolutions
	};
	return pokemon;
};
