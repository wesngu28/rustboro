import type { Info } from "./basicInterface";

export interface Species {
  base_happiness: number;
  capture_rate: number;
  color: Info;
  egg_groups: Info[];
  evolution_chain: Evolutionchain;
  evolves_from_species: Info;
  flavor_text_entries: Flavortextentry[];
  form_descriptions: Formdescription[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Info;
  growth_rate: Info;
  habitat?: any;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Info[];
  order: number;
  pal_park_encounters: any[];
  pokedex_numbers: Pokedexnumber[];
  shape: Info;
  varieties: Variety[];
}

export interface Variety {
  is_default: boolean;
  pokemon: Info;
}

interface Pokedexnumber {
  entry_number: number;
  pokedex: Info;
}

export interface Genus {
  genus: string;
  language: Info;
}

interface Formdescription {
  description: string;
  language: Info;
}

interface Flavortextentry {
  flavor_text: string;
  language: Info;
  version: Info;
}

export interface Evolutionchain {
  url: string;
}