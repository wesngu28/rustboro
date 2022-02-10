'use strict';
(function() {

  window.addEventListener('load', init);
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  const PERSONAL_SIX = ['94', '471', '382', '282', '609', '169'];

  let activeSlide = 0;
  let currentFigure = 0;

  const gen1 = 152;
  const gen2 = 252;
  const gen3 = 387;
  const gen4 = 494;
  const gen5 = 650;
  const gen6 = 722;
  const gen7 = 810;
  const gen8 = 899;
  const runs = 6;

  /**
   *  Init function that runs after the site is loaded and adds associated
   *  events to the buttons within the html.
   */
  function init() {
    id('start-btn').addEventListener('click', sixRandoms);
    id('other-btn').addEventListener('click', unhidePersonal);

    let back = document.querySelector('.back');
    let forward = document.querySelector('.next');
    back.addEventListener('click', backSlide);
    forward.addEventListener('click', nextSlide);
  }

  /**
   *  This function is associated with the start button and runs the sequence
   *  that leads to six random pokemon being generated based on criteria. It
   *  starts by removing all the previous pokemon, if they exist, before running
   *  a for loop that includes the fetch sequence to pull six pokemon from
   *  the api.
   */
  function sixRandoms() {
    let oldPokemonName = document.querySelectorAll('#pokemon-table p');
    let oldPokemonImage = document.querySelectorAll('#pokemon-table img');
    for (let i = 0; i < oldPokemonName.length; i++) {
      oldPokemonName[i].parentNode.removeChild(oldPokemonName[i]);
      oldPokemonImage[i].parentNode.removeChild(oldPokemonImage[i]);
    }
    activeSlide = 0;
    for (let i = 0; i < runs; i++) {
      let rand = Math.floor(Math.random() * (maximum() - minimum()) + minimum());
      fetch(BASE_URL + rand)
        .then(statusCheck)
        .then(res => res.json())
        .then(processData)
        .catch(errorHandler);
    }
  }

  /**
   *  This function assigns the maximum value for the random that is called
   *  in the above function based on the regional dex numbers for the specified
   *  regions.
   *  @return {Float} - returns the maximum value
   */
  function maximum() {
    let range = 0;
    let pokedex = document.querySelector('input[name="range"]:checked');
    pokedex = pokedex.value;
    if (pokedex === 'kanto') {
      range = gen1;
    } else if (pokedex === 'johto') {
      range = gen2;
    } else if (pokedex === 'hoenn') {
      range = gen3;
    } else if (pokedex === 'sinnoh') {
      range = gen4;
    } else if (pokedex === 'unova') {
      range = gen5;
    } else if (pokedex === 'kalos') {
      range = gen6;
    } else if (pokedex === 'alola') {
      range = gen7;
    } else if (pokedex === 'galar') {
      range = gen8;
    } else {
      range = gen8;
    }
    return range;
  }

  /**
   *  This function assigns the minimum value for the random that is called
   *  in the above function based on the regional dex numbers for the specified
   *  regions.
   *  @return {Float} - returns the minimum value
   */
  function minimum() {
    let range = 0;
    let pokedex = document.querySelector('input[name="range"]:checked');
    pokedex = pokedex.value;
    if ((pokedex === 'kanto') || (pokedex === 'national')) {
      range = 0;
    } else if (pokedex === 'johto') {
      range = gen1;
    } else if (pokedex === 'hoenn') {
      range = gen2;
    } else if (pokedex === 'sinnoh') {
      range = gen3;
    } else if (pokedex === 'unova') {
      range = gen4;
    } else if (pokedex === 'kalos') {
      range = gen5;
    } else if (pokedex === 'alola') {
      range = gen6;
    } else if (pokedex === 'galar') {
      range = gen7;
    }
    return range;
  }

  /**
   *  This function deals with reading from the passed in api link and appends
   *  them to the dom, but they are still hidden.
   *  @param {object} response - reads in the response json
   */
  function processData(response) {
    let pokemon = document.createElement('p');
    let pkmnname = response.name;
    pokemon.textContent = capitalize(pkmnname);
    id('pokemon-table').appendChild(pokemon);

    let officialart = document.createElement('img');
    officialart.src = response['sprites']['other']['official-artwork']['front_default'];
    id('pokemon-table').appendChild(officialart);
    display();
  }

  /**
   *  This function is used to read in the pokemon names, which are lowercase
   *  by defaut, and makes the first letter uppercase.
   *  @param {String} string - reads in the name value
   *  @return {String} - returns the string with the first letter uppercase
   */
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /** Function called when the back button is clicked to go back a slide*/
  function backSlide() {
    displaySlide(activeSlide += -1);
  }

  /** Function called when the next button is clicked to go to the next slide*/
  function nextSlide() {
    displaySlide(activeSlide += 1);
  }

  /**
   *  This function is used to make sure the first pokemon is displayed without
   *  the need to click any button.
   */
  function display() {
    let figures = document.querySelectorAll('#pokemon-table img');
    figures[activeSlide].style.display = "block";

    let names = document.querySelectorAll('#pokemon-table p');
    names[activeSlide].style.display = "block";
  }

  /**
   *  This function handles the slideshow and what happens when the buttons are
   *  clicked, hiding the names and images of stuff that are not being used
   *  and changing the display to block for the active image.
   *  @param {float} index - passes in a value for the active image index
   */
  function displaySlide(index) {
    let count = 0;
    let figures = document.querySelectorAll('#pokemon-table img');
    let names = document.querySelectorAll('#pokemon-table p');
    if (index > figures.length - 1) {
      activeSlide = 0;
    }
    if (index < 0) {
      activeSlide = figures.length - 1;
    }
    for (count = 0; count < figures.length; count++) {
      figures[count].style.display = "none";
      names[count].style.display = "none";
    }
    figures[activeSlide].style.display = "block";
    names[activeSlide].style.display = "block";
  }

  /**
   *  This function is called by clicking the second button and is essentially
   *  the same as the other one but it will always display six and all six
   *  at the same time.
   */
  function unhidePersonal() {
    for (let i = 0; i < runs; i++) {
      fetch(BASE_URL + PERSONAL_SIX[i])
        .then(statusCheck)
        .then(res => res.json())
        .then(displayPersonal)
        .catch(errorHandler);
    }

    let hiddens = document.querySelectorAll('.hidden');
    for (let i = 0; i < hiddens.length; i++) {
      hiddens[i].classList.remove('hidden');
    }
    document.getElementById('other-btn').disabled = true;
  }

  /**
   *  This function reads the passed in json and appends the elements to the
   *  page.
   *  @param {object} response - reads in the response json
   */
  function displayPersonal(response) {
    let figures = document.querySelectorAll('figure');
    let officialart = document.createElement('img');
    officialart.src = response['sprites']['other']['official-artwork']['front_default'];
    figures[currentFigure].appendChild(officialart);

    let pokemon = document.createElement('figcaption');
    let pkmnname = response.name;
    pokemon.textContent = capitalize(pkmnname);
    figures[currentFigure].appendChild(pokemon);
    currentFigure++;
  }

  /**
   *  This function handles a passed in error and appends it to the page to let
   *  the user know what happened.
   *  @param {object} response - reads in the response json
   */
  function errorHandler(response) {
    let errorMessage = document.createElement('p');
    let msg = "There was an error requesting data from the Pokemon API: " +
    response;
    errorMessage.textContent = msg;
    id('response').appendChild(errorMessage);
  }

  /**
   * Provided helper function to pull id elements from the DOM.
   * @param {string} idName - element ID.
   * @returns {object} - DOM object that has this id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Provided helper function to check whether or not a network related or api
   * related issue has happened before passing the file on.
   * @param {object} response - response to check for success/error
   * @return {object} - returns a response json
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text);
    }
    return response;
  }

})();