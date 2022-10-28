import type { NamedAPIResource } from './Pokemon';

export interface PokemonSpecies {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchable: boolean;
	growth_rate: NamedAPIResource;
	pokedex_numbers: PokemonSpeciesDexEntry[];
	egg_groups: NamedAPIResource[];
	color: NamedAPIResource;
	shape: NamedAPIResource;
	evolves_from_species: NamedAPIResource;
	evolution_chain: APIResource;
	habitat: NamedAPIResource;
	generation: NamedAPIResource;
	names: Name[];
	pal_park_encounters: PalParkEncounterArea[];
	flavor_text_entries: FlavorText[];
	form_descriptions: Description[];
	genera: Genus[];
	varieties: PokemonSpeciesVariety[];
}

export interface Genus {
	genus: string;
	language: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
	entry_number: number;
	pokedex: NamedAPIResource;
}

export interface PalParkEncounterArea {
	base_score: number;
	rate: number;
	area: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
	is_default: boolean;
	pokemon: NamedAPIResource;
}

export interface APIResource {
	url: string;
}

export interface FlavorText {
	flavor_text: string;
	language: NamedAPIResource;
	version?: Version;
}

export interface Version {
	name: string;
	url: string;
}

export interface Description {
	description: string;
	language: NamedAPIResource;
}

export interface Name {
	name: string;
	language: NamedAPIResource;
}
