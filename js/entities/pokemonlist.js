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


    /* Añadir las funciones que consideréis necesarias*/
    toJSON() {
        //...
    }

    fromJSON(pokemons) {
        //...
    }
}