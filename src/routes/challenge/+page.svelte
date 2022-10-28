<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import Rustboro from '../../components/Rustboro.svelte';

</script>

<div class="wrapper">
	<Header pokeBallWork={true} />
	<Rustboro />
	<Footer button={false}/>
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
		background-color: aliceblue;
		font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
	}
</style>
