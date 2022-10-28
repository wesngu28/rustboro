<script lang="ts">
	import Header from '../components/Header.svelte';
	import Pokedex from '../components/Pokedex.svelte';
	import Footer from '../components/Footer.svelte';
	import { pokemonList, showAbout } from '../stores/stores';
	import About from '../components/About.svelte';
</script>

<svelte:head>
	<title>Pokemon Stats Viewer</title>
</svelte:head>

<div class="wrapper">
	<Header pokeBallWork={true} />
	<Pokedex pokemon={$pokemonList} />
	<About show={$showAbout} />
	<Footer button={true} />
</div>

<style scoped>
	.wrapper {
		min-height: 97.5vh;
		position: relative;
		padding-bottom: 2rem;
	}
	:global(body) {
		padding: 0;
		margin: 0;
		overflow-x: hidden;
		background-color: aliceblue;
		font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
	}
</style>
