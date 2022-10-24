import type { Pokemon } from "../models/Pokemon";
import { capitalize } from "../helpers/capitalize";
import type { DisplayPokemon } from "../models/DisplayPokemon";
import type { Species, text, Variety } from "../models/PokemonSpecies";
import type { Evolution, Evolvesto } from "../models/EvolutionChain";
import { capitalizeAndRemove } from "../helpers/capitalizeAndRemove";

export const processPokemon = async (response: Pokemon) => {
    let preferredArt: string
    let sprite: string
    if(response.sprites.other['official-artwork'].front_default) {
        preferredArt = response.sprites.other['official-artwork'].front_default
        if (response.sprites.versions["generation-v"]["black-white"].animated.front_default) {
            sprite = response.sprites.versions["generation-v"]["black-white"].animated.front_default
        } else {
            sprite = response.sprites.front_default
        }
    } else if (response.sprites.versions["generation-v"]["black-white"].animated.front_default) {
        preferredArt = response.sprites.versions["generation-v"]["black-white"].animated.front_default
        sprite = response.sprites.versions["generation-v"]["black-white"].animated.front_default
    } else {
        preferredArt = response.sprites.front_default
        sprite = response.sprites.front_default
    }
    const pokemonPkdex = await fetch(response.species.url)
    const pokedex: Species = await pokemonPkdex.json()
    const pokemonEvolution = await fetch(pokedex.evolution_chain.url)
    const evolution: Evolution = await pokemonEvolution.json()
    const findEnglishGenus = pokedex.genera.filter(p => p.language.name === 'en')
    const badlyPunctuatedOrCase = ['red', 'blue', 'yellow', 'gold', 'silver', 'crystal', 'ruby', 'sapphire', 'emerald', 'firered', 'leafgreen', 'diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver']
    const findEnglishFlavor=  pokedex.flavor_text_entries.filter(p => p.language.name === 'en')
    const useGoodEntry = findEnglishFlavor.filter(p => !badlyPunctuatedOrCase.includes(p.version.name))
    const findVarieties =  pokedex.varieties.filter(p => p.is_default === false)

    const usefulVariety = findVarieties.map((v: Variety) => {
        return { name: capitalizeAndRemove(v.pokemon.name), url: v.pokemon.url } as text
    })
    let evolutions: string[] = []
    evolutions = [...evolutions, evolution.chain.species.name]
	const digDeeper = async (evolutionTree: Evolvesto[]) => {
        if(!evolutionTree[0]) return
        console.log(evolutionTree[0].species.name)
		evolutions = [...evolutions, evolutionTree[0].species.name] 
		if (Object.keys(evolutionTree[0]).includes('evolves_to')) {
			digDeeper(evolutionTree[0].evolves_to)
		}
	}
    await digDeeper(evolution.chain.evolves_to)
    evolutions = evolutions.map((e: string) => { return capitalize(e) })
    console.log(evolutions)
    const pokemon: DisplayPokemon = {
        id: response.id,
        name: capitalize(response.name),
        art: preferredArt,
        sprite: sprite,
        abilities: response.abilities,
        stats: response.stats,
        types: response.types,
        title: findEnglishGenus[0].genus,
        blurb: useGoodEntry[0].flavor_text,
        varieties: usefulVariety,
        evolution: evolutions,
    }
    return pokemon
}
// will get more information on subsequent updates