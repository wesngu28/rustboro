export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  sprites: PokemonSprites;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

export interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface PokemonSprites {
	front_default: string | null;
	front_shiny: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	back_shiny_female: string | null;
	other?: OtherPokemonSprites;
}

export interface OtherPokemonSprites {
	"official-artwork": OfficialArtwork;
}

export interface OfficialArtwork {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}
