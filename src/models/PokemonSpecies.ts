export interface Species {
    base_happiness: number;
    capture_rate: number;
    color: text;
    egg_groups: text[];
    evolution_chain: Evolutionchain;
    evolves_from_species: text;
    flavor_text_entries: Flavortextentry[];
    form_descriptions: Formdescription[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genus[];
    generation: text;
    growth_rate: text;
    habitat?: any;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: any[];
    pokedex_numbers: Pokedexnumber[];
    shape: text;
    varieties: Variety[];
  }
  
  export interface Variety {
    is_default: boolean;
    pokemon: text;
  }
  
  interface Pokedexnumber {
    entry_number: number;
    pokedex: text;
  }
  
  interface Name {
    language: text;
    name: string;
  }
  
  export interface Genus {
    genus: string;
    language: text;
  }
  
  interface Formdescription {
    description: string;
    language: text;
  }
  
  interface Flavortextentry {
    flavor_text: string;
    language: text;
    version: text;
  }
  
  export interface Evolutionchain {
    url: string;
  }
  
  export interface text {
    name: string;
    url: string;
  }