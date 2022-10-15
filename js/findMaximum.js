 export function maximum(gens) {
    let range = 0
    let pokedex = document.querySelector('input[name="range"]:checked')
    pokedex = pokedex.value
    if (Object.keys(gens).includes(pokedex)) {
        range = gens[pokedex][1]
        return range
    }
    return gens['galar'][1]
  }