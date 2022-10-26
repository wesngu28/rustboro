import type { Pokemon } from "../models/Pokemon";
import { capitalize } from "../helpers/capitalize";
import type { Ability, DisplayPokemon } from "../models/DisplayPokemon";
import type { Species, Variety } from "../models/PokemonSpecies";
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
    const { evolution_chain, genera, flavor_text_entries, varieties}: Species = await pokemonPkdex.json()
    const pokemonEvolution = await fetch(evolution_chain.url)
    const { chain }: Evolution = await pokemonEvolution.json()
    const findEnglishGenus = genera.filter(p => p.language.name === 'en')
    const badlyPunctuatedOrCase = ['red', 'blue', 'yellow', 'gold', 'silver', 'crystal', 'ruby', 'sapphire', 'emerald', 'firered', 'leafgreen', 'diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver']
    const findEnglishFlavor=  flavor_text_entries.filter(p => p.language.name === 'en')
    const useGoodEntry = findEnglishFlavor.filter(p => !badlyPunctuatedOrCase.includes(p.version.name))
    const findVarieties =  varieties.filter(p => p.is_default === false)

    const usefulVariety = findVarieties.map((v: Variety) => {
        return capitalizeAndRemove(v.pokemon.name)
    })
    let evolutions: string[] = []
    evolutions = [...evolutions, chain.species.name]
	const digDeeper = async (evolutionTree: Evolvesto[]) => {
        if(!evolutionTree[0]) return
        console.log(evolutionTree[0].species.name)
		evolutions = [...evolutions, evolutionTree[0].species.name] 
		if (Object.keys(evolutionTree[0]).includes('evolves_to')) {
			digDeeper(evolutionTree[0].evolves_to)
		}
	}

    await digDeeper(chain.evolves_to)
    evolutions = evolutions.map((e: string) => { return capitalize(e) })

    let abilities: Ability[] = []
    response.abilities.forEach((ability) => {
        const abilityInfo = {
            name: ability.ability.name,
            hidden: ability.is_hidden
        }
        abilities = [...abilities, abilityInfo]
    })

    let types: string[] = []
    response.types.forEach((type) => {
        types = [...types, type.type.name]
    })

    const stats: string[] = response.stats.map((stat) => {
        return `${stat.stat.name}:${stat.base_stat}`
    })

    const pokemon: DisplayPokemon = {
        id: response.id,
        name: capitalize(response.name),
        art: preferredArt,
        sprite: sprite,
        abilities: abilities,
        stats: stats,
        types: types,
        title: findEnglishGenus[0].genus,
        blurb: useGoodEntry[0].flavor_text,
        varieties: usefulVariety,
        evolution: evolutions,
    }
    return pokemon
}