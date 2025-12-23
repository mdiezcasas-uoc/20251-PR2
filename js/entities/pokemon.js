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
    constructor({ id, name, description, height, weight, baseExperience, abilities, types, sprites, stats }) {
        this.setId = id;
        this.setName = name;
        this.setDescription = description;
        this.setHeight = height;
        this.setWeight = weight;
        this.setBaseExperience = baseExperience;
        this.setAbilities = abilities;
        this.setTypes = types;
        this.setSprites = sprites;
        this.setStats = stats;
    }

    /* Getters y Setters */
    get getId() {
        return this.#id;
    }

    set setId(id) {
        this.#id = id;
    }

    get getName() {
        return this.#name;
    }

    set setName(name) {
        this.#name = name;
    }

    get getDescription() {
        return this.#description;
    }

    set setDescription(description) {
        this.#description = description;
    }

    get getHeight() {
        return this.#height;
    }

    set setHeight(height) {
        this.#height = height;
    }

    get getWeight() {
        return this.#weight;
    }

    set setWeight(weight) {
        this.#weight = weight;
    }

    get getBaseExperience() {
        return this.#baseExperience;
    }

    set setBaseExperience(baseExperience) {
        this.#baseExperience = baseExperience;
    }

    get getAbilities() {
        return this.#abilities;
    }

    set setAbilities(abilities) {
        this.#abilities = abilities;
    }

    get getTypes() {
        return this.#types;
    }

    set setTypes(types) {
        this.#types = types;
    }
    
    get getSprites() {
        return this.#sprites;
    }

    set setSprites(sprites) {
        this.#sprites = sprites;
    }

    get getStats() {
        return this.#stats;
    }

    set setStats(stats) {
        this.#stats = stats;
    }


    /* Añadir las funciones que consideréis necesarias*/   
    toJSON() {
        //...
    }

    fromJSON(pokemons) {
        //...
    }
}