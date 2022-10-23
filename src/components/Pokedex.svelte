<script lang="ts">
	import { capitalizeAndRemove } from '../helpers/capitalizeAndRemove';
	import type { DisplayPokemon } from '../models/DisplayPokemon';
	export let pokemon: Array<DisplayPokemon>;
	console.log(pokemon)
	let idx = 0;
	const handleKeydown = (event: KeyboardEvent) => {
		if (pokemon.length > 1) {
			if (event.key === 'ArrowLeft') {
				previousPokemon();
			}
			if (event.key === 'ArrowRight') {
				nextPokemon();
			}
		}
	};
	const previousPokemon = () => {
		if (idx === 0) {
			idx = pokemon.length - 1;
		} else {
			idx = idx - 1;
		}
		console.log(idx);
	};
	const nextPokemon = () => {
		if (idx === pokemon.length - 1) {
			idx = 0;
		} else {
			idx = idx + 1;
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />
{#if pokemon.length > 0}
	<div class="slideshow">
		{#if pokemon.length > 1}
			<a on:click={previousPokemon} class="back">&#8592;</a>
		{/if}
		{#each pokemon as pkmn, i}
			<div class="pokemon {i === idx ? 'show' : 'hidden'}">
				<div class="nameArt">
					<h1>{pkmn.name}</h1>
					<img src={pkmn.art} />
				</div>
				<div class="info">
					<div class="spriteability">
						<div class="sprite-holder">
							<img class="sprite" src={pkmn.sprite ? pkmn.sprite : 'headerBall.png'} />
						</div>
						<div class="abilitydiv">
							<div>
								{#each pkmn.types as typer}
									<p>
										<span class="type">{capitalizeAndRemove(typer.type.name)}</span>
									</p>
								{/each}
							</div>
							<div>
								<p>Abilities</p>
								<ul>
									{#each pkmn.abilities as ability}
										<li>
											<span>{capitalizeAndRemove(ability.ability.name)}</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
					<table class="spriteTable">
						{#each pkmn.stats as stat}
						<tr>
							<td><span>{capitalizeAndRemove(stat.stat.name)}</span></td>
							<td class="long"><span style="display: inline-block; {`background-color: hsl(${100*(stat.base_stat/150)},100%,50%); width: ${100*(stat.base_stat/200)}%;`}" class="stat">{stat.base_stat}</span></td>
						</tr>
						{/each}
					</table>
				</div>
			</div>
		{/each}
		{#if pokemon.length > 1}
			<a on:click={nextPokemon} class="next">&#8594;</a>
		{/if}
	</div>
{:else}
	<div />
{/if}

<style scoped>
	.slideshow {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 9rem;
		position: relative;
	}
	.type {
		margin: 0.5rem;
		padding: 0.25rem;
		background-color: beige;
		border-radius: 0.5rem;
	}
	div {
		display: flex;
	}
	.pokemon {
		flex-direction: row;
		width: 45vw;
		background-color: ghostwhite;
		padding: 2rem;
	}
	.nameArt {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 55%;
	}
	.info {
		width: 45%;
		flex-direction: column;
		justify-content: center;
	}
	.spriteTable {
		padding: 3rem;
		display: table;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		flex-direction: column;
		width: 100%;
	}
	.long {
		width: 65%;
	}
	.stat {
		background-color: aqua;
	}
	.abilitydiv {
		justify-content: center;
		flex-direction: column;
	}
	.abilitydiv > div:first-child {
		flex-direction: row;
		justify-content: center;
		text-align: left;
	}
	.abilitydiv > div:first-child > p {
		text-align: center;
	}
	.abilitydiv > div:last-child {
		flex-direction: row;
		align-items: center;
	}
	.spriteability {
		flex-direction: row;
		justify-content: space-around;
	}

	.hidden {
		display: none;
	}

	.show {
		display: flex;
	}
	ul {
		list-style: none;
	}
	.nameArt > img {
		max-width: 475px;
		object-fit: cover;
	}
	.sprite-holder {
		width: 150px;
		height: 150px;
	}
	.sprite {
		max-width: 100%;
		height: auto;
	}
</style>
