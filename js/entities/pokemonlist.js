
class PokemonList {
    #pokemons;

    /* Constructor de la clase PokemonList */
    constructor() {
        this.setPokemons = [];
    }

    /* Getters y Setters */
    get getPokemons() {
        return this.#pokemons;
    }

    set setPokemons(pokemons) {
        this.#pokemons = pokemons;
    }

    /**
     * Filtra y devuelve un listado de Pokémons con los ids que 
     * coincidan con el listado de ids pasado por parámetro.
     */
    getPokemonsByIds(ids) {
        return this.#pokemons.filter(pokemon => ids.includes(pokemon.getId));
    }

    /**
     * Filtra y devuelve un listado de Pokémons con los nombres que 
     * coincidan con el listado de nombres pasado por parámetro.
     */
    getPokemonsByNames(names) {
        return this.#pokemons.filter(pokemon => names.includes(pokemon.getName));
    }

    /**
     * Devuelve de forma filtrada y ordenada un array de instancias Pokémon según el
     * objeto recibido con las condiciones.
     */
    filter({ nameOrNumber, minWeight, maxWeight, types, orderBy }) {
        return this.#pokemons.filter(pokemon => {
            // Declaración de condiciones según los parámetros recibidos.
            let idSearch = pokemon.getId === parseInt(nameOrNumber);
            let nameSearch = pokemon.getDisplay.toLowerCase().includes(nameOrNumber.toLowerCase());
            let minWeightMatch = pokemon.getWeight >= minWeight;
            let maxWeightMatch = pokemon.getWeight <= maxWeight;
            let typeSearch = types.length > 0 ? pokemon.getTypes.filter(type => types.includes(type.name)).length > 0 : true;

            // Combinación de las condiciones precomputadas anteriormente. 
            // Únicamente se devolverán los registros que han cumplido la condición.
            return (idSearch || nameSearch) && minWeightMatch && maxWeightMatch && typeSearch;

        // Ordena la lista filtrada según cada caso implementado.
        // Por defecto devuelve una lista ascendente por ids.
        }).sort((a, b) => {
            if (orderBy === 'id-asc') return a.getId - b.getId;
            if (orderBy === 'id-desc') return b.getId - a.getId;
            if (orderBy === 'name-asc') return a.getDisplay.localeCompare(b.getDisplay);
            if (orderBy === 'name-desc') return b.getDisplay.localeCompare(a.getDisplay);
            return a.getId - b.getId;
        });
    }
}
