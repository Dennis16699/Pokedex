let currentPokemon = [];
let currentOffset = 0;
let limit = 30;


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
}

function renderAbilities() {
    document.getElementById('abilitiesInfo').style.display = 'block';
    document.getElementById('baseStatsInfo').style.display = 'none';
    document.getElementById('movesInfo').style.display = 'none';
}

function renderBaseStats() {
    document.getElementById('abilitiesInfo').style.display = 'none';
    document.getElementById('baseStatsInfo').style.display = 'block';
    document.getElementById('movesInfo').style.display = 'none';
}

function renderMoves() {
    document.getElementById('abilitiesInfo').style.display = 'none';
    document.getElementById('baseStatsInfo').style.display = 'none';
    document.getElementById('movesInfo').style.display = 'block';
}

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


function showFullCard() {
    let FullCard = document.getElementById('pokemonDetails');
    FullCard.style.display = 'flex';
}


function closePokemonDetails() {
    const pokemonDetailsDiv = document.getElementById('pokemonDetails');
    pokemonDetailsDiv.style.display = 'none';
}

function loadMorePokemon() {
    renderAllPokemon();
}

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

function searchPokenmon(filteredPokemon) {
    let pokemonContainer = document.getElementById('Pokedex');
    pokemonContainer.innerHTML = '';

    for (let pokemon of filteredPokemon) {
        let pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = generaterenderAllPokemon(pokemon);
        pokemonContainer.appendChild(pokemonDiv);
    }
}

function generaterenderpokemonDetailsDiv(selectedPokemon){
    return `
    <div class="pokedatacard">
        <div class="infos">
            <span class="pokeID">#${selectedPokemon.id}</span>
            <h1 class="pokeName">${selectedPokemon.name}</h1>
            <div class="mediaPokeImg">
                <img  src="${selectedPokemon.sprites.other['official-artwork'].front_default}">
            </div>
        </div>
        <div class="allinformation">
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

