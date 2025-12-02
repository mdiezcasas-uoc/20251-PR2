class User {
    #name;
    #surname;
    #address;
    #city;
    #postalCode;
    #email;
    #username;
    #password;
    #myTeam;
    #wishes;


    /* Constructor de la clase User */
    /* Getters y Setters */ 
    

    // Método para añadir o eliminar pokemons de las listas
    manageList(pokemon, listName, action) {
        //...
    }

    /* Método para guardar el usuario en el localStorage */
    save() {
        //...
    }

    /* Método para actualizar un usuario en el localStorage */
    update() {
        //...
    }

    /* Añadir las funciones que consideréis necesarias*/
}

class Pokemon {
    #id;
    #name;
    #height;
    #weight;
    #baseExperience;
    #abilities;
    #types;
    #sprites;
    #stats;
    #description;

    /* Constructor de la clase Pokemon */
    /* Getters y Setters */ 
    /* Añadir las funciones que consideréis necesarias*/   

    toJSON() {
        //...
    }

    fromJSON(pokemons) {
        //...
    }
}

class PokemonList {
    #pokemons;

    /* Constructor de la clase PokemonList */
    /* Getters y Setters */ 
    /* Añadir las funciones que consideréis necesarias*/
    
    toJSON() {
        //...
    }

    fromJSON(pokemons) {
        //...
    }

    
}