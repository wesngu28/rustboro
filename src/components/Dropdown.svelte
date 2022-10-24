<script lang="ts">
	import { getPokemon } from "../api/searchPokemon";
	import { getSixRandomPokemon } from "../api/getSixRandomPokemon"
    import { pokemonList, showAbout } from '../stores/stores'
    export let show: boolean
    let search = ''
    let regions = ['National', 'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Forms']
    

	const handleKeydown = async (event: KeyboardEvent) => {
		if (search) {
			if (event.key === 'Enter') {
				const pokemon = await getPokemon(search)
                console.log(pokemon)
                pokemonList.update((str) => pokemon)
                showAbout.update((show) => false)
			}
		}
	};
    async function prepareSixRandom(event: Event) {
        const pokemon = await getSixRandomPokemon(event)
        pokemonList.update((list) => pokemon)
        showAbout.update((show) => false)
    }
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="{show ? 'visible' : 'hidden'}">
    <input placeholder="Search a Pokemon" bind:value={search}>
    <p>or choose a region for six random Pokemon</p>
    <ul>
        {#each regions as region, i}
            <li>
                <button on:click={(event) => prepareSixRandom(event)}>{region}</button>
            </li>  
        {/each}
    </ul>
</div>

<style scoped>

    .visible {
        display: flex;
    }

    .hidden {
        display: none;
    }

    div {
        justify-content: center;
        align-items: center;
        position: absolute;
        flex-direction: column;
        z-index: 5;
        bottom: -9rem;
    }

    input {
        height: 2rem;
        margin-bottom: 0;
        width: min-content;
    }

    p {
        margin-top: 1rem;
        margin-bottom: 0;
    }

    ul {
        margin-top: 0;
        display: flex;
        list-style: none;
        flex-wrap: wrap;
    }
    li {
        padding: 0.5rem;
        border-radius: 2px;
        background-color: salmon;
        margin: 0.5rem;
    }

    button {
        border: none;
        background-color: transparent;
    }
    @media (max-width: 820px) {
        div {
            width: 100vw;
        }
        ul {
            flex-wrap: wrap;
        }
        li {
            padding: 0rem;
            margin: 0.2rem;
        }
    }
</style>