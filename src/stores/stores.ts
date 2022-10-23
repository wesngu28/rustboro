import type { DisplayPokemon } from '../models/DisplayPokemon';
import { writable, type Writable } from 'svelte/store';

export const pokemonList: Writable<DisplayPokemon[]>= writable([] as Array<DisplayPokemon>)
export const showAbout: Writable<boolean>= writable(false)