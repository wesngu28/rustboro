import type { NamedAPIResource } from "./Pokemon";
import type { Name } from "./PokemonSpecies";

export interface EvolutionTrigger {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: NamedAPIResource[];
}

export interface EvolutionDetail {
  item: NamedAPIResource;
  trigger: NamedAPIResource;
  gender: number;
  held_item: NamedAPIResource;
  known_move: NamedAPIResource;
  known_move_type: NamedAPIResource;
  location: NamedAPIResource;
  min_level: number;
  min_happiness: number;
  min_beauty: number;
  min_affection: number;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource;
  party_type: NamedAPIResource;
  relative_physical_stats: 1 | 0 | -1;
  time_of_day: "Day" | "Night";
  trade_species: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_detail: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource;
  chain: ChainLink;
}