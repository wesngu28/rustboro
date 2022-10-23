<script lang="ts">
	import Dropdown from "./Dropdown.svelte";
	let pokeBallClick: boolean = false;
	export let pokeBallWork: boolean;
	
	const flipBall = () => {
		if(!pokeBallWork) return;
		if (pokeBallClick) return pokeBallClick = false
		return pokeBallClick = true
	}
</script>

<header>
	<img on:click={flipBall} alt="pokeball button" src="headerBall.png">
	<Dropdown show={pokeBallClick} />
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