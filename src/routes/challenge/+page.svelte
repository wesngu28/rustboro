<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import Rustboro from '../../components/Rustboro.svelte';
</script>

<svelte:head>
	<title>Stats Challenge</title>
</svelte:head>

<div class="wrapper">
	<Header pokeBallWork={true} />
	<Rustboro />
	<Footer button={false} />
</div>
