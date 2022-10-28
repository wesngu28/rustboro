<script lang="ts">
	import { pokemonList, showAbout } from '../stores/stores';
	export let button: boolean;
	let unshow: boolean;

	showAbout.subscribe((value: boolean) => {
		unshow = value;
	});

	async function displayFavorite() {
		if (unshow) {
			pokemonList.update((list) => []);
			showAbout.update((show) => false);
		} else {
			showAbout.update((show) => true);
			const response = await fetch(`/api/pokemon?pokemon=${'94,471,382,282,609,169'}`);
			const usable = await response.text();
			const pokemon = JSON.parse(usable);
			pokemonList.update((list) => pokemon);
		}
	}
</script>

<footer>
	{#if button}
		<button on:click={displayFavorite}>About</button>
	{/if}
</footer>

<style scoped>
	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 2rem;
		position: absolute;
		bottom: 0;
		background-color: goldenrod;
	}

	button {
		border: none;
		background-color: tomato;
		color: white;
		padding: 0.3rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 0.9rem;
	}
</style>
