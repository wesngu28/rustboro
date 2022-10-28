<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	let pokeBallClick: boolean = false;
	export let pokeBallWork: boolean;
	import { onMount } from 'svelte';
	let url = ``;
	onMount(() => (url = window.location.href));

	const flipBall = () => {
		if (!pokeBallWork) return;
		if (pokeBallClick) return (pokeBallClick = false);
		return (pokeBallClick = true);
	};
</script>

<header>
	{#if !url.includes('challenge')}
		<a href="/challenge"><img alt="clickable stone badge" src="stoneBadge.png" /></a>
		<img on:click={flipBall} alt="clickable pokeball button" src="headerBall.png" />
		<Dropdown show={pokeBallClick} />
		<a href="/challenge"><img alt="clickable stone badge" src="stoneBadge.png" /></a>
	{:else}
		<img alt="clickable pokeball button" src="headerBall.png" />
		<Dropdown show={pokeBallClick} />
		<a href="/"><img alt="clickable stone badge" src="stoneBadge.png" /></a>
	{/if}
</header>

<style>
	header {
		width: 100vw;
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: goldenrod;
		position: relative;
	}

	img {
		height: 5rem;
	}
</style>
