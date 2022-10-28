<script lang="ts">
	import { highScore } from "../stores/highScoreLocalStore";
    let localScore = 0
    let localHigh = 0
	highScore.subscribe((value: number) => {
		localHigh = value;
	});
	import { capitalizeAndRemove } from "../helpers/capitalizeAndRemove";
    let wrapper: HTMLDivElement;
    let randStats: string;
    let answer: string;
    let info: string;
    let pokemon: string[];
    let sprite: string[];
    let stat: number[]
    let challengeStarted: boolean = false
    let status: string
    async function challenge() {
        const secondaryButtons = wrapper.querySelectorAll('.secondary')
        secondaryButtons.forEach((button) => {
            (button as HTMLButtonElement).disabled = false
        })
        status = ''
        const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'Base Stat Total']
        let randStatIndex = Math.floor(Math.random() * (stats.length - 0) + 0)
        randStats = capitalizeAndRemove(stats[randStatIndex])
        const response = await fetch(`/api/challenge`);
        const txt = await response.text()
        const twoPokemon  = JSON.parse(txt)
        pokemon = [twoPokemon[0].name, twoPokemon[1].name]
        sprite = [twoPokemon[0].sprite, twoPokemon[1].sprite]
        if(randStats === 'BST') {
            let pokemon1Stats: string[] = twoPokemon[0].stats.map((stat: string) => {
                return stat.split(':')[1]
            })
            const sumWithInitial = pokemon1Stats.reduce(
                (previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0
            );
            let pokemon2Stats: string[] = twoPokemon[1].stats.map((stat: string) => {
                return stat.split(':')[1]
            })
            const sumWithInitial2 = pokemon2Stats.reduce(
                (previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0
            );
            stat = [sumWithInitial, sumWithInitial2]
        } else {
            stat = [Number(twoPokemon[0].stats[randStatIndex].split(':')[1]), Number(twoPokemon[1].stats[randStatIndex].split(':')[1])]
        }
        challengeStarted = true
    }
    
    function makeResult(selected: number) {
        status = 'wrong'
        let compare = ''
        if (stat[0] === stat[1]) compare = 'the same as'
        else compare = 'as opposed to'
        if (selected === 1) {
            if(stat[0] > stat[1]) {
                status = 'correct'
            }
            answer = `You chose ${pokemon[0]} which is ${status}!`
            info = `${pokemon[0]} has a ${randStats} value of ${stat[0]}, ${compare} ${pokemon[1]}'s ${stat[1]}.`
        } else if(selected === 2) {
            if(stat[1] > stat[0]) {
                status = 'correct'
            }
            answer = `You chose ${pokemon[1]} which is ${status}!`
            info = `${pokemon[1]} has a ${randStats} value of ${stat[1]}, ${compare} ${pokemon[0]}'s ${stat[0]}.`
        } else {
            if(stat[1] == stat[0]) {
                answer = `You chose a draw which is right!`
                info = `${pokemon[0]} has a ${randStats} value of ${stat[1]}, ${compare} ${pokemon[1]}'s ${stat[0]}.`
            } else {
                answer = `You chose a draw which is wrong!`
                info = `${pokemon[0]} has a ${randStats} value of ${stat[1]}, ${compare} ${pokemon[1]}'s ${stat[0]}.`
            }
        }
        const secondaryButtons = wrapper.querySelectorAll('.secondary')
        secondaryButtons.forEach((button) => {
            (button as HTMLButtonElement).disabled = true
        })
        if (status === 'correct') localScore = localScore + 1
        if (status === 'wrong') localScore = 0
        if (localHigh < localScore) {
            localHigh = localScore
            highScore.update((value) => localHigh);
        }
    }
</script>

<div bind:this="{wrapper}">
    <div>
        <h1>Rustboro City's Stat Guessing Challenge</h1>
        {#if challengeStarted}
            <button on:click={() => challengeStarted = false}>End Challenge</button>
        {:else} 
            <img alt="test proctor Roxanne" src="/Roxanne.jpg" />
            <button on:click={(event) => challenge()}>Start Challenge</button>
        {/if}
    </div>
    {#if challengeStarted}
        <p>Which has the higher {randStats}?</p>
        <div class="challenge">
            <div>
                <p>{pokemon[0]}</p>
                <img alt={`sprite of ${pokemon[0]}`} src={sprite[0]} />
                <button class="secondary" on:click={() => makeResult(1)}>Choose</button>
            </div>
            <div>
                <p>{pokemon[1]}</p>
                <img alt={`sprite of ${pokemon[1]}`} src={sprite[1]} />
                <button class="secondary" on:click={() => makeResult(2)}>Choose</button>
            </div>
        </div>
        <button class="secondary" on:click={() => makeResult(3)}>They're the same</button>
        {#if status}
            <p>{answer}</p>
            <p>{info}</p>
            <button class="tertiary" on:click={() => challenge()}>New Set</button>
        {/if}
    {/if}
    <p>🔥 Your current streak is {localScore} 🔥</p>
    <p>💎 Your high score is {$highScore} 💎</p>
</div>

<style>
    img {
        max-width: 25vh;
        height: auto;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        text-align: center;
    }

    .challenge {
        flex-direction: row;
        justify-content: space-around;
        width: 50%;
    }

    p {
        width
        : 50%;
    }
    
    @media (max-width: 960px) {
        p {
            width: 85%;
        }
    }
    
	button {
		background-color: red;
        padding: 1rem;
        border-radius: 5%;
        color: white;
	}

    .secondary {
        background-color: green;
        padding: 0.25rem;
        border-radius: 9999px;
    }

    .secondary:disabled {
        opacity: 25%
    }

    .tertiary {
        background-color: blue;
        padding: 0.25rem;
        border-radius: 9999px;
    }
</style>