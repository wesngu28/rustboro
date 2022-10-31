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
		Galar: [810, 899],
		Forms: [10001, 10248],
		'My Favorite': []
	};
	// For whatever reason, pokemon past 898 (calyrex) and form 10247 (basculin white-striped) do not work
	const handleKeydown = async (event: KeyboardEvent) => {
		if (search) {
			if (event.key === 'Enter') {
				const response = await fetch(`/api/pokemon?pokemon=${search}`);
				const usable = await response.text();
				const pokemon = JSON.parse(usable);
				pokemonList.update((list) => pokemon);
				showAbout.update((show) => false);
			}
		}
	};

	async function displayFavorite() {
		const response = await fetch(
			`/api/pokemon?pokemon=${'Gengar,Chandelure,Gardevoir,Kyogre,Glaceon,Crobat'}`
		);
		const usable = await response.text();
		const pokemon = JSON.parse(usable);
		pokemonList.update((list) => pokemon);
		showAbout.update((show) => false);
	}

	async function prepareSixRandom(event: Event) {
		const clickedRegion = (event.target as HTMLButtonElement).innerText;
		if (clickedRegion === 'My Favorite') {
			await displayFavorite();
		} else {
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
			const response = await fetch(`/api/pokemon?pokemon=${randStr}&random=yes`);
			const usable = await response.text();
			const pokemon = JSON.parse(usable);
			pokemonList.update((list) => pokemon);
			showAbout.update((show) => false);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class={show ? 'visible' : 'hidden'}>
	<input
		placeholder="Search a Pokemon, or click a button for six random Pokemon"
		bind:value={search}
	/>
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
		bottom: -6.75rem;
	}

	input {
		min-height: 1.5rem;
		margin-bottom: 0;
		width: 24rem;
		height: auto;
	}
	ul {
		margin-top: 0;
		display: flex;
		list-style: none;
		flex-wrap: wrap;
	}

	li {
		border-radius: 2px;
		background-color: salmon;
		margin: 0.5rem;
	}

	button {
		padding: 0.5rem;
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

		button {
			padding: 0.15rem;
		}

		li {
			padding: 0rem;
			font-size: 0.25rem;
			margin: 0.2rem;
		}
	}
</style>
