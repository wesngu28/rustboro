<script lang="ts">
    export let show: boolean;
</script>

<div class="{show ? 'show' : 'hidden'}">
    <h1>Pokemon Search App + Challenge</h1>
    <h2>What is this exactly?</h2>
    <p>This is a remake of my first ever real project using the HTML/CSS/Javascript stack, remade in SvelteKit.
        Svelte is a framework that I really like and enjoy using as it feels much more natural than using something
        like React (which I still like). The above slideshow are my six favorite pokemon.
    </p>
    <p>Made with large credit to the PokeApi, Svelte, and SvelteKit. This does not have any affiliation with Nintendo, GameFreak,
        or the Pokemon Company.
    </p>
</div>

<style>
    div {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        text-align: center;
    }
    p {
        width: 50%;
    }
    @media (max-width: 960px) {
        p {
            width: 85%;
        }
    }
    
    .show {
        display: flex;
    }

    .hidden {
        display: none;
    }
</style>