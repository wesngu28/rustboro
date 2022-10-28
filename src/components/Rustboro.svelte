<script lang="ts">
	import { capitalizeAndRemove } from "../helpers/capitalizeAndRemove";
    let wrapper: HTMLDivElement;
    let randStats: string;
    let answer: string;
    let compare: string;
    let info: string;
    let pokemon1: string;
    let sprite1: string;
    let pokemon1Stat: number;
    let pokemon2: string;
    let sprite2: string;
    let pokemon2Stat: number;
    let challengeStarted: boolean = false
    let status: string
    async function challenge() {
        status = ''
        const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'Base Stat Total']
        let randStatIndex = Math.floor(Math.random() * (stats.length - 0) + 0)
        randStats = capitalizeAndRemove(stats[randStatIndex])
        const response = await fetch(`/api/challenge`);
        const txt = await response.text()
        const twoPokemon  = JSON.parse(txt)
        pokemon1 = twoPokemon[0].name
        sprite1 = twoPokemon[0].sprite
        pokemon2 = twoPokemon[1].name
        sprite2 = twoPokemon[1].sprite
        if(randStats === 'BST') {
            let pokemon1Stats: string[] = twoPokemon[0].stats.map((stat: string) => {
                return stat.split(':')[1]
            })
            const sumWithInitial = pokemon1Stats.reduce(
                (previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0
            );
            pokemon1Stat = sumWithInitial
            let pokemon2Stats: string[] = twoPokemon[1].stats.map((stat: string) => {
                return stat.split(':')[1]
            })
            const sumWithInitial2 = pokemon2Stats.reduce(
                (previousValue, currentValue) => Number(previousValue) + Number(currentValue), 0
            );
            pokemon2Stat = sumWithInitial2
        } else {
            pokemon1Stat = Number(twoPokemon[0].stats[randStatIndex].split(':')[1])
            pokemon2Stat = Number(twoPokemon[1].stats[randStatIndex].split(':')[1])
        }
        challengeStarted = true
    }
    function endChallenge () {
        challengeStarted = false
    }
    function makeResult(selected: number) {
        if (pokemon1Stat === pokemon2Stat) compare = 'the same as'
        else compare = 'as opposed to'
        if (selected === 1) {
            if(pokemon1Stat > pokemon2Stat) {
                status = 'correct'
            } else {
                status = 'wrong'
            }
            answer = `You chose ${pokemon1} which is ${status}!`
            info = `${pokemon1} has a ${randStats} value of ${pokemon1Stat} ${compare} ${pokemon2}'s ${pokemon2Stat}.`
        } else if(selected === 2) {
            if(pokemon2Stat > pokemon1Stat) {
                status = 'correct'
            } else {
                status = 'wrong'
            }
            answer = `You chose ${pokemon2} which is ${status}!`
            info = `${pokemon2} has a ${randStats} value of ${pokemon2Stat} ${compare} ${pokemon1}'s ${pokemon1Stat}.`
        } else {
            if(pokemon2Stat == pokemon1Stat) {
                answer = `You chose a draw which is right!`
                info = `${pokemon1} has a ${randStats} value of ${pokemon2Stat}, ${compare} ${pokemon2}'s ${pokemon1Stat}.`
            } else {
                answer = `You chose a draw which is wrong!`
                info = `${pokemon1} has a ${randStats} value of ${pokemon2Stat} ${compare} ${pokemon2}'s ${pokemon1Stat}.`
            }
        }
        const secondaryButtons = wrapper.querySelectorAll('.secondary')
        secondaryButtons.forEach((button) => {
            (button as HTMLButtonElement).disabled = true
        })
    }
</script>

<div bind:this="{wrapper}">
    <div>
        <h1>Rustboro City's Stat Guessing Challenge</h1>
        {#if challengeStarted}
            <button on:click={(event) => endChallenge()}>End Challenge</button>
        {:else} 
            <img src="/Roxanne.jpg" />
            <button on:click={(event) => challenge()}>Start Challenge</button>
        {/if}
    </div>
    {#if challengeStarted}
        <p>Which has the higher {randStats}?</p>
        <div class="challenge">
            <div>
                <p>{pokemon1}</p>
                <img src={sprite1} />
                <button class="secondary" on:click={() => makeResult(1)}>Choose</button>
            </div>
            <div>
                <p>{pokemon2}</p>
                <img src={sprite2} />
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