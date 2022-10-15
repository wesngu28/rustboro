export function minimum(gens) {
    let range = 0
    let pokedex = document.querySelector('input[name="range"]:checked')
    pokedex = pokedex.value
    if (Object.keys(gens).includes(pokedex)) {
        range = gens[pokedex][0]
        return range
    }
    return 0
  }