import { writable } from 'svelte-local-storage-store';

export const highScore = writable('highScore', 0);
