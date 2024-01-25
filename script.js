let currentPokemon = [];
let currentOffset = 0;
let limit = 30;


/**
 * Function to render a batch of Pokémon and display them on the page.
 * @async
 * @function renderAllPokemon
 */
async function renderAllPokemon() {
    let pokemonContainer = document.getElementById('Pokedex');

    for (let i = currentOffset + 1; i <= currentOffset + limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemon = await response.json();
        currentPokemon.push(pokemon);

        let pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = generaterenderAllPokemon(pokemon);

        pokemonContainer.appendChild(pokemonDiv);
    }
    // Aktualisiere den aktuellen Offset für das nächste Laden von Pokémon
    currentOffset += limit;

}

/**
 * Function to show the details of a specific Pokémon.
 * @param {number} pokemonId - The ID of the Pokémon to display details for.
 */
function showPokemonDetails(pokemonId) {
    // Finde das ausgewählte Pokémon anhand seiner ID
    let selectedPokemon = currentPokemon.find(pokemon => pokemon.id === pokemonId);

    if (selectedPokemon) {
        let pokemonDetailsDiv = document.getElementById('pokemonDetails');

        // Setze den HTML-Inhalt der 'pokemonDetails' Div mit den ausgewählten Pokémon-Details
        pokemonDetailsDiv.innerHTML = generaterenderpokemonDetailsDiv(selectedPokemon);

        // Zeige die 'pokemonDetails' Div an
        pokemonDetailsDiv.style.display = 'block';
    }
    renderAbilities();
    renderChart(selectedPokemon);
    turnOn();
}

/**
 * Function to render the abilities section for a Pokémon.
 */
function renderAbilities() {
    document.getElementById('abilitiesInfo').style.display = 'block';
    document.getElementById('baseStatsInfo').style.display = 'none';
    document.getElementById('movesInfo').style.display = 'none';
}

/**
 * Function to render the base stats section for a Pokémon.
 */
function renderBaseStats() {
    document.getElementById('abilitiesInfo').style.display = 'none';
    document.getElementById('baseStatsInfo').style.display = 'block';
    document.getElementById('movesInfo').style.display = 'none';
}

/**
 * Function to render the moves section for a Pokémon.
 */
function renderMoves() {
    document.getElementById('abilitiesInfo').style.display = 'none';
    document.getElementById('baseStatsInfo').style.display = 'none';
    document.getElementById('movesInfo').style.display = 'block';
}

/**
 * Function to generate HTML for displaying Pokémon abilities.
 * @param {Object[]} abilities - An array of abilities for a Pokémon.
 * @returns {string} - HTML representation of Pokémon abilities.
 */
function showPokemonDetailsAbilities(abilities) {
    let abilitiesHTML = '';
    for (let i = 0; i < abilities.length; i++) {
        abilitiesHTML += `${abilities[i].ability.name}`;
        if (i < abilities.length - 1) {
            abilitiesHTML += ', ';
        }
    }
    return abilitiesHTML;
}

/**
 * Function to generate HTML for displaying Pokémon types.
 * @param {Object[]} types - An array of types for a Pokémon.
 * @returns {string} - HTML representation of Pokémon types.
 */
function showPokemonDetailsTypes(types) {
    let typesHTML = '';
    for (let i = 0; i < types.length; i++) {
        typesHTML += `${types[i].type.name}`;
        if (i < types.length - 1) {
            typesHTML += ', ';
        }
    }
    return typesHTML;
}

/**
 * Function to generate HTML for displaying Pokémon moves.
 * @param {Object[]} moves - An array of moves for a Pokémon.
 * @returns {string} - HTML representation of Pokémon moves.
 */
function showPokemonDetailsMoves(moves) {
    let movesHTML = '';
    for (let i = 0; i < moves.length; i++) {
        movesHTML += `${moves[i].move.name}`;
        if (i < moves.length - 1) {
            movesHTML += ', ';
        }
    }
    return movesHTML;
}


/**
 * Function to display the full Pokémon card.
 */
function showFullCard() {
    let FullCard = document.getElementById('pokemonDetails');
    FullCard.style.display = 'flex';
}

/**
 * Function to close the Pokémon details section.
 */
function closePokemonDetails() {
    const pokemonDetailsDiv = document.getElementById('pokemonDetails');
    pokemonDetailsDiv.style.display = 'none';
}

/**
 * Function to load more Pokémon when a "Load More" button is clicked.
 */
function loadMorePokemon() {
    renderAllPokemon();
}

/**
 * Function to filter Pokémon based on a search input.
 */
function filternPokenmon() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();

    let filteredPokemon = currentPokemon.filter(pokemon => {
        return (
            pokemon.id.toString().includes(searchInput) || // Filtern nach ID
            pokemon.name.includes(searchInput) // Filtern nach Namen
        );
    });
    searchPokenmon(filteredPokemon);
}

/**
 * Function to display Pokémon based on filtering results.
 * @param {Object[]} filteredPokemon - An array of Pokémon to display after filtering.
 */
function searchPokenmon(filteredPokemon) {
    let pokemonContainer = document.getElementById('Pokedex');
    pokemonContainer.innerHTML = '';

    for (let pokemon of filteredPokemon) {
        let pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = generaterenderAllPokemon(pokemon);
        pokemonContainer.appendChild(pokemonDiv);
    }
}

/**
 * Function to display the Pokémon details section.
 */
function turnOn() {
    document.getElementById("pokemonDetails").style.display = "flex";
}

/**
 * Function to hide the Pokémon details section.
 */
function turnOff() {
    document.getElementById("pokemonDetails").style.display = "none";
}

/**
 * Function to prevent closing the Pokémon details section when an event is triggered.
 * @param {Event} event - The event object to prevent closing for.
 */
function notClose(event) {
    event.stopPropagation();
}

function generaterenderpokemonDetailsDiv(selectedPokemon) {
    return `
    <div class="pokedatacard">
        <div class="infos" onclick="notClose(event)">
            <span class="pokeID">#${selectedPokemon.id}</span>
            <h1 class="pokeName">${selectedPokemon.name}</h1>
            <div class="mediaPokeImg">
                <img  src="${selectedPokemon.sprites.other['official-artwork'].front_default}">
            </div>
        </div>
        <div class="allinformation" onclick="notClose(event)">
            <div class="navbarinfo">
                <a class="navbar" onclick="renderAbilities()">About</a>
                <a class="navbar" onclick="renderBaseStats()">Base Stats</a>
                <a class="navbar" onclick="renderMoves()">Moves</a>
            </div>
            <div style="display: none;" id="abilitiesInfo" class="aboutInfo">
                <div class="height">
                    <span style="color: grey; margin-right: 52px;">Type:</span>
                    <span style="text-transform: capitalize;">${showPokemonDetailsTypes(selectedPokemon.types)}</span>
                </div>
                <div class="height">
                    <span style="color: grey; margin-right: 31px;">Height:</span>
                    <span>${selectedPokemon.height / 10} m</span>
                </div>
                <div class="height">
                    <span style="color: grey; margin-right: 25px;">Weight:</span>
                    <span>${selectedPokemon.weight / 10} kg</span>
                </div>
                <div class="height">
                    <span style="color: grey; margin-right: 18px;">Abilities:</span>
                    <span style="text-transform: capitalize;">${showPokemonDetailsAbilities(selectedPokemon.abilities)}</span>
                </div>
            </div>
            <div style="display: none;" id="baseStatsInfo">
                <div>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
            <div style="display: none;" id="movesInfo">
                <div>
                    <div class="moves" style="color: black; text-transform: capitalize;">${showPokemonDetailsMoves(selectedPokemon.moves)}</div>
                </div>
            </div>
                <button class="closeButton" onclick="closePokemonDetails()">Close</button>
        </div>
    </div>
    `
}

function generaterenderAllPokemon(pokemon) {
    return `
        <div onclick="showPokemonDetails(${pokemon.id})" class="PokedexInfo">
            <p id="pokemonID">#${pokemon.id}</p>
            <h2 id="pokemonName">${pokemon.name}</h2>
            <img id="pokemonImages" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        </div>
    `
}
