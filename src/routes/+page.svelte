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
