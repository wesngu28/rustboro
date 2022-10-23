<script lang="ts">
	import type { DisplayPokemon } from "../models/DisplayPokemon";
	export let pokemon: Array<DisplayPokemon>;

	let idx = 0;
	const handleKeydown = (event: KeyboardEvent) => {
		if (pokemon.length > 1) {
			if (event.key === 'ArrowLeft') {
				previousPokemon();
			}
			if (event.key === 'ArrowRight') {
				nextPokemon();
			}
		}
	};
	const previousPokemon = () => {
		if (idx === 0) {
			idx = pokemon.length - 1;
		} else {
			idx = idx - 1;
		}
		console.log(idx);
	};
	const nextPokemon = () => {
		if (idx === pokemon.length - 1) {
			idx = 0;
		} else {
			idx = idx + 1;
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />
{#if pokemon.length > 0}
	<div class="slideshow">
		{#if pokemon.length > 1}
            <a on:click={previousPokemon} class="back">&#8592;</a>
        {/if}
		{#each pokemon as pkmn, i}
			<div class={i === idx ? 'show' : 'hidden'}>
				<p>{pkmn.name}</p>
				<img src={pkmn.art} />
			</div>
		{/each}
		{#if pokemon.length > 1}
            <a on:click={nextPokemon} class="next">&#8594;</a>
        {/if}
	</div>
{:else}
    <div></div>
{/if}

<style scoped>
	.slideshow {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 9rem;
		text-align: center;
		position: relative;
	}

	.hidden {
		display: none;
	}

	.show {
		display: block;
	}

    img {
        width: 100%;
        height: auto;
    }
</style>
