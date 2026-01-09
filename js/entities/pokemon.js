
class Pokemon {
    #id;
    #name;
    #display;
    #height;
    #weight;
    #baseExperience;
    #abilities;
    #types;
    #sprites;
    #stats;
    #description;
    #category;
    #hasGenderDifferences;
    #evolutions;

    /* Constructor de la clase Pokemon */
    constructor({ id, name, display, description, height, weight, baseExperience, abilities, types, sprites, stats, category, hasGenderDifferences, evolutions }) {
        this.setId = id;
        this.setName = name;
        this.setDisplay = display;
        this.setDescription = description;
        this.setHeight = height;
        this.setWeight = weight;
        this.setBaseExperience = baseExperience;
        this.setAbilities = abilities;
        this.setTypes = types;
        this.setSprites = sprites;
        this.setStats = stats;
        this.setCategory = category;
        this.setHasGenderDifferences = hasGenderDifferences;
        this.setEvolutions = evolutions;
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

    get getDisplay() {
        return this.#display;
    }

    set setDisplay(display) {
        this.#display = display;
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

    get getCategory() {
        return this.#category;
    }

    set setCategory(category) {
        this.#category = category;
    }
    
    get getHasGenderDifferences() {
        return this.#hasGenderDifferences;
    }

    set setHasGenderDifferences(hasGenderDifferences) {
        this.#hasGenderDifferences = hasGenderDifferences;
    }

    get getEvolutions() {
        return this.#evolutions;
    }

    set setEvolutions(evolutions) {
        this.#evolutions = evolutions;
    }

    /**
     * Método que permite extraer valores específicos por índice de ciertos
     * atributos internos iterables.
     * Recibe el nombre del atributo y el índice, en caso de no encontrar registro,
     * devuelve un string vacío.
     */
    getAttributeByIndex(attributeType, index) {

        let attribute;

        switch (attributeType) {
            case 'sprites':
                attribute = this.getSprites;
                break;
            case 'description':
                attribute = this.getDescription;
                break;
            case 'abilities':
                attribute = this.getAbilities;
                break;
            default:
                attribute = [];
        }

        if (attribute.length > 0 && index < attribute.length) {
            return attribute[index] || '';
        }

        return '';
    }
}
