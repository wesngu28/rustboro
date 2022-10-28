<script lang="ts">
	import { pokemonList, showAbout } from '../stores/stores';
	export let show: boolean;
	let search = '';
	const gens: { [key: string]: Array<number> } = {
		Kanto: [1, 152],
		Johto: [152, 252],
		Hoenn: [252, 387],
		Sinnoh: [387, 494],
		Unova: [494, 650],
		Kalos: [650, 722],
		Alola: [722, 810],
		Galar: [810, 906],
		Forms: [10001, 10250]
	};

	const handleKeydown = async (event: KeyboardEvent) => {
		if (search) {
			if (event.key === 'Enter') {
				const response = await fetch(`/api/pokemon?pokemon=${search}`);
				const usable = await response.text();
				const pokemon = JSON.parse(usable);
				pokemonList.update((list) => pokemon);
				showAbout.update((show) => false);
				pokemonList.update((str) => pokemon);
			}
		}
	};

	async function prepareSixRandom(event: Event) {
		const clickedRegion = (event.target as HTMLButtonElement).innerText;
		let value: Array<number> = [];
		if (Object.keys(gens).includes(clickedRegion)) {
			value = gens[clickedRegion];
		}
		if (clickedRegion === 'National') value = [1, 906];
		let randStr = '';
		for (let i = 0; i < 6; i++) {
			const rand = Math.floor(Math.random() * (value[1] - value[0]) + value[0]);
			randStr += rand + ',';
		}
		randStr = randStr.slice(0, randStr.length - 1);
		const response = await fetch(`/api/pokemon?pokemon=${randStr}`);
		const usable = await response.text();
		const pokemon = JSON.parse(usable);
		pokemonList.update((list) => pokemon);
		showAbout.update((show) => false);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class={show ? 'visible' : 'hidden'}>
	<input placeholder="Search a Pokemon" bind:value={search} />
	<p>or choose a region for six random Pokemon</p>
	<ul>
		{#each Object.keys(gens) as region, i}
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
