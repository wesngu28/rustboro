<script lang="ts">
	import { highScore } from '../stores/highScoreLocalStore';
	let localScore = 0;
	let localHigh = 0;
	highScore.subscribe((value: number) => {
		localHigh = value;
	});
	import { capitalizeAndRemove } from '../helpers/capitalizeAndRemove';
	let wrapper: HTMLDivElement;
	let randStats: string;
	let answer: string;
	let info: string;
	let pokemon: string[];
	let sprite: string[];
	let stat: number[];
	let challengeStarted: boolean = false;
	let status: string;
	async function challenge() {
		const secondaryButtons = wrapper.querySelectorAll('.secondary');
		secondaryButtons.forEach((button) => {
			(button as HTMLButtonElement).disabled = false;
		});
		status = '';
		const stats = [
			'hp',
			'attack',
			'defense',
			'special-attack',
			'special-defense',
			'speed',
			'Base Stat Total'
		];
		let randStatIndex = Math.floor(Math.random() * (stats.length - 0) + 0);
		randStats = capitalizeAndRemove(stats[randStatIndex]);
		const response = await fetch(`/api/challenge`);
		const txt = await response.text();
		const twoPokemon = JSON.parse(txt);
		pokemon = [twoPokemon[0].name, twoPokemon[1].name];
		sprite = [twoPokemon[0].sprite, twoPokemon[1].sprite];
		if (randStats === 'Base Stat Total') {
			let pokemon1Stats: string[] = twoPokemon[0].stats.map((stat: string) => {
				return stat.split(':')[1];
			});
			const sumWithInitial = pokemon1Stats.reduce(
				(previousValue, currentValue) => Number(previousValue) + Number(currentValue),
				0
			);
			let pokemon2Stats: string[] = twoPokemon[1].stats.map((stat: string) => {
				return stat.split(':')[1];
			});
			const sumWithInitial2 = pokemon2Stats.reduce(
				(previousValue, currentValue) => Number(previousValue) + Number(currentValue),
				0
			);
			stat = [sumWithInitial, sumWithInitial2];
		} else {
			stat = [
				Number(twoPokemon[0].stats[randStatIndex].split(':')[1]),
				Number(twoPokemon[1].stats[randStatIndex].split(':')[1])
			];
		}
		challengeStarted = true;
	}

	function makeResult(selected: number) {
		status = 'wrong';
		let compare = '';
		if (stat[0] === stat[1]) compare = 'the same as';
		else compare = 'as opposed to';
		if (selected === 1) {
			if (stat[0] > stat[1]) {
				status = 'correct';
			}
			answer = `You chose ${pokemon[0]} which is`;
			info = `${pokemon[0]} has a ${randStats} value of ${stat[0]}, ${compare} ${pokemon[1]}'s ${stat[1]}.`;
		} else if (selected === 2) {
			if (stat[1] > stat[0]) {
				status = 'correct';
			}
			answer = `You chose ${pokemon[1]} which is`;
			info = `${pokemon[1]} has a ${randStats} value of ${stat[1]}, ${compare} ${pokemon[0]}'s ${stat[0]}.`;
		} else {
			if (stat[1] == stat[0]) {
				status = 'jackpot';
				answer = `For correctly guessing a draw, you have received a 5 point`;
				info = `${pokemon[0]} has a ${randStats} value of ${stat[1]}, ${compare} ${pokemon[1]}'s ${stat[0]}.`;
			} else {
				answer = `You chose a draw which is`;
				info = `${pokemon[0]} has a ${randStats} value of ${stat[1]}, ${compare} ${pokemon[1]}'s ${stat[0]}.`;
			}
		}
		if (stat[1] === stat[0] && status === 'wrong') {
			answer = 'It was a draw!' 
			status = 'Free Pass'
		}
		const secondaryButtons = wrapper.querySelectorAll('.secondary');
		secondaryButtons.forEach((button) => {
			(button as HTMLButtonElement).disabled = true;
		});
		if (status === 'correct') localScore = localScore + 1;
		if (status === 'jackpot') localScore = localScore + 5;
		if (status === 'wrong') localScore = 0;
		if (localHigh < localScore) {
			localHigh = localScore;
			highScore.update((value) => localHigh);
		}
	}
</script>

<div bind:this={wrapper}>
	<div class="top">
		<h1>Rustboro City's Stat Challenge</h1>
		{#if challengeStarted}
			<button on:click={() => (challengeStarted = false)}>End Challenge</button>
		{:else}
			<img class="roxanne" alt="test proctor Roxanne" src="/Roxanne.jpg" />
			<button on:click={(event) => challenge()}>Start Challenge</button>
		{/if}
	</div>
	{#if challengeStarted}
		<p class="category">Which has the higher <span>{randStats}</span>?</p>
		<div class="challenge">
			<div class="pokemon">
				<p>{pokemon[0]}</p>
				<img alt={`sprite of ${pokemon[0]}`} src={sprite[0]} />
				<button class="secondary" on:click={() => makeResult(1)}>Choose</button>
			</div>
			<button class="secondary" on:click={() => makeResult(3)}>Draw</button>
			<div class="pokemon">
				<p>{pokemon[1]}</p>
				<img alt={`sprite of ${pokemon[1]}`} src={sprite[1]} />
				<button class="secondary" on:click={() => makeResult(2)}>Choose</button>
			</div>
		</div>
		{#if status}
			<div class="result">
				<p>
					{answer} <span style={status === 'jackpot' ? 'color: blue' : status === 'wrong' ? 'color: red' : status === 'Free Pass' ? 'color: gold' : 'color: green'}>{status}</span>!
				</p>
				<p>{info}</p>
				<button class="tertiary" on:click={() => challenge()}>New Set</button>
			</div>
		{/if}
	{/if}
	<div class="scores">
		<p>???? Your current streak is {localScore} ????</p>
		<p>???? Your high score is {$highScore} ????</p>
	</div>
</div>

<style>
	span {
		font-weight: bold;
	}

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
	}

	.top {
		padding-top: 0;
	}

	h1 {
		font-size: 2.5rem;
	}

	.pokemon {
		height: max-content;
		width: 192px;
	}

	.pokemon > p {
		font-size: 1.15rem;
	}

	.result > p {
		font-size: 1.1rem;
	}

	.pokemon img {
		max-width: 152px;
		width: 200%;
		max-height: 152px;
		height: auto;
		object-fit: contain;
	}

	.challenge {
		flex-direction: row;
		justify-content: space-around;
		width: 50%;
	}

	button {
		background-color: red;
		padding: 1rem;
		border-radius: 5%;
		color: white;
		font-size: 1.25rem;
	}

	.secondary {
		background-color: green;
		padding: 0.25rem;
		border-radius: 9999px;
	}

	.secondary:disabled {
		opacity: 25%;
	}

	.tertiary {
		background-color: blue;
		padding: 0.25rem;
		margin: 1rem;
		border-radius: 9999px;
	}

	.scores {
		padding: 1rem;
		font-size: 1.25rem;
	}

	.category {
		font-size: 1.25rem;
	}
</style>
