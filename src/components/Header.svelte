<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	let pokeBallClick: boolean = false;
	export let pokeBallWork: boolean;
	import { page } from '$app/stores';
	const flipBall = () => {
		if (!pokeBallWork) return;
		if (pokeBallClick) return (pokeBallClick = false);
		return (pokeBallClick = true);
	};
</script>

<header>
	<a on:click={!$page.url.pathname.includes('challenge') ? flipBall : null} href="/"
		><img alt="clickable pokeball button" src="headerBall.png" /></a
	>
	<Dropdown show={pokeBallClick} />
	<a href="/challenge"><img alt="clickable stone badge" src="stoneBadge.png" /></a>
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
