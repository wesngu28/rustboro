<script lang="ts">
	export let show: boolean;
</script>

{#if show}
	<div>
		<h2>Click the Pokeball to search, click the Badge to play</h2>
		<img
			class="roxanne"
			alt="Roxanne, 1st gym leader in Ruby sapphire emerald"
			src="/roxanne.jpg"
		/>
		<h1>Rustboro Trainer's School</h1>
		<a href="https://github.com/wesngu28/rustboro">Github Repo</a>
		<p>
			This is a remake of my first ever real project using the HTML/CSS/Javascript stack, remade in
			SvelteKit. Svelte is a framework that I really like and enjoy using as it feels much more
			natural than using something like React (which I still like). All Pokemon are stored within a 
			cockroachDB database, which is a kind of SQL database. I took a lot of inspiration for the stats 
			that are displayed per Pokemon from Smogon, although the implementation is all my own. The Pokemon 
			evolution's graphic may incorrectly show some lines
			(as Pokemon may be missing). 
		</p>
		<p>
			The game pulls two random Pokemon from the database and randomly selects a stat. You must choose the
			Pokemon that has the higher stat of the two, or have to accurately predict a draw (difficulty: impossible).
		</p>
		<p>
			Made with large credit to the PokeApi (and the Pokenode-TS wrapper), CockroachDB, Svelte, and SvelteKit. This does not have any
			affiliation with Nintendo, GameFreak, or the Pokemon Company.
		</p>
	</div>
{/if}

<style>
	.roxanne {
		max-width: 35vh;
		width: 75%;
		height: auto;
		padding: 1rem;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		text-align: center;
		margin-top: 4rem;
	}

	h1 {
		margin-bottom: 0;
	}
	a {
		text-decoration: none;
		margin-top: 0.15rem;
	}

	a:hover {
		text-decoration: underline;
	}

	p {
		width: 50%;
		text-align: left;
	}
	@media (max-width: 960px) {
		p {
			width: 85%;
		}
	}
</style>
