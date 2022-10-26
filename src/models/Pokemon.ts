import type { Info } from "./basicInterface";

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Info[];
  game_indices: Gameindex[];
  height: number;
  held_items: Helditem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Info;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Type {
  slot: number;
  type: Info;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Info;
}

interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: Versions;
}

interface Versions {
  'generation-i': Generationi;
  'generation-ii': Generationii;
  'generation-iii': Generationiii;
  'generation-iv': Generationiv;
  'generation-v': Generationv;
  'generation-vi': Generationvi;
  'generation-vii': Generationvii;
  'generation-viii': Generationviii;
}

interface Generationviii {
  icons: Dreamworld;
}

interface Generationvii {
  icons: Dreamworld;
  'ultra-sun-ultra-moon': Home;
}

interface Generationvi {
  'omegaruby-alphasapphire': Home;
  'x-y': Home;
}

interface Generationv {
  'black-white': Blackwhite;
}

interface Blackwhite {
  animated: Diamondpearl;
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Generationiv {
  'diamond-pearl': Diamondpearl;
  'heartgold-soulsilver': Diamondpearl;
  platinum: Diamondpearl;
}

interface Diamondpearl {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Generationiii {
  emerald: Emerald;
  'firered-leafgreen': Fireredleafgreen;
  'ruby-sapphire': Fireredleafgreen;
}

interface Fireredleafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface Emerald {
  front_default: string;
  front_shiny: string;
}

interface Generationii {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

interface Generationi {
  'red-blue': Redblue;
  yellow: Redblue;
}

interface Redblue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

interface Other {
  dream_world: Dreamworld;
  home: Home;
  'official-artwork': Officialartwork;
}

interface Officialartwork {
  front_default: string;
}

interface Home {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Dreamworld {
  front_default: string;
  front_female?: any;
}


interface Other {
  'official-artwork': Officialartwork;
}

interface Officialartwork {
  front_default: string;
}

interface Ability {
  ability: Info;
  is_hidden: boolean;
  slot: number;
}

interface Move {
  move: Info;
  version_group_details: Versiongroupdetail[];
}

interface Versiongroupdetail {
  level_learned_at: number;
  move_learn_method: Info;
  version_group: Info;
}

interface Helditem {
  item: Info;
  version_details: Versiondetail[];
}

interface Versiondetail {
  rarity: number;
  version: Info;
}

interface Gameindex {
  game_index: number;
  version: Info;
}