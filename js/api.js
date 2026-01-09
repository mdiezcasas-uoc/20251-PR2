class PokeAPI {

    /**
     * Consulta la PokeAPI para obtener un listado de Pokémons.
     * Realizando la llamada adicional para consultar la información detallada
     * de cada registro.
     */
    static async getPokemonList() {
        try {
            let response = await fetch(config.url.base + '251');
            if (response.status === 200) {
                let data = await response.json();
                let pokemons = [];

                for (let result of data?.results ?? []) {
                    if (result?.name) {
                        let pokemon = await PokeAPI.getPokemonData(result.name);
                        if (pokemon !== null) pokemons.push(pokemon);
                    }
                }

                if (pokemons.length > 0) {
                    Store.insertPokemons(pokemons);
                }

            } else {
                showAlert('No hemos podido cargar los datos.', 'danger');
            }
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * Consulta el detalle del Pokémon, incluyendo las llamadas a la especie correspondiente.
     * Devuelve un objeto con toda la información requerida y limpia.
     */
    static async getPokemonData(name) {

        if (name) {
            try {
                let response = await fetch(config.url.pokemon + name);

                if (response.status === 200) {
                    let data = await response.json();

                    if (data) {
                        let sprites = [];
                        let img =  data.sprites.other['official-artwork'].front_default || null;
                        let imgMale =  data.sprites.other.home.front_default || null;
                        let imgFemale =  data.sprites.other.home.front_female || null;
                        if (img !== null) sprites.push(img);
                        if (imgMale !== null) sprites.push(imgMale);
                        if (imgFemale !== null) sprites.push(imgFemale);

                        let stats = new Object();
                        data.stats.forEach(item => stats[item.stat.name] = item.base_stat);

                        let typeNames = data.types.map(type => type.type.name);
                        let types = Store.getTypes();

                        let species = await PokeAPI.getSpeciesData(name);
                        
                        let abilityNames = data.abilities.filter(item => !item.is_hidden).map(ability => ability.ability.name);
                        let abilities = Store.getAbilities();

                        let result = {
                            id: data.id,
                            name: data.name,
                            height: data.height,
                            weight: data.weight,
                            baseExperience: data.base_experience,
                            sprites: sprites,
                            stats: stats,
                            types: types.filter(type => typeNames.includes(type.name)).map(type => {
                                return {
                                    name: type.name,
                                    display: type.display
                                }
                            }),
                            abilities: abilities.filter(ability => abilityNames.includes(ability.name)),
                        }

                        if (species !== null) {
                            result.display = species.name;
                            result.description = species.description;
                            result.category = species.category;
                            result.hasGenderDifferences = species.hasGenderDifferences;
                            result.evolutions = species.evolutions;
                        }

                        return result;
                    }
                }
            } catch(error) {
                console.log(error);
            }
        }

        return null;
    }

    /**
     * Consulta el detalle de la especie de un Pokémon por nombre y devuelve un objeto con
     * toda la información requerida y limpia.
     */
    static async getSpeciesData(name) {
    
        if (name) {
            try {
                let response = await fetch(config.url.species + name);

                if (response.status === 200) {
                    let data = await response.json();

                    if (data) {
                        let nameObject = data.names.find(item => item.language.name === 'es');
                        let description = data.flavor_text_entries
                            .filter(item => item.language.name === 'es')
                            .map(item => item.flavor_text.replaceAll('\n', ' '));

                        let category = null;
                        let categoryObject = data.genera.find(item => item.language.name === 'es');

                        if (categoryObject !== undefined) {
                            if (categoryObject.genus.includes('Pokémon')) {
                                categoryObject.genus = categoryObject.genus.replace('Pokémon', '').trim();
                            }

                            category = categoryObject.genus;
                        }

                        return {
                            name: nameObject !== undefined ? nameObject.name : name,
                            description: Array.from(new Set(description)),
                            category: category,
                            hasGenderDifferences: data.has_gender_differences,
                            evolutions: await PokeAPI.getEvolutionData(data.evolution_chain.url)
                        };
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        return null;
    }

    /**
     * Consulta el detalle de la cadena de evolución de un Pokémon por url y devuelve un listado de
     * nombres ordenados.
     */
    static async getEvolutionData(url) {
    
        // Función auxiliar para navegar sobre la información obtenida y extraer
        // un listado ordenado de nombres de Pokémon.
        function getEvolutionChain(responseData) {
            let result = [];

            function traverse(node) {
                if (!node) return;
                result.push(node.species.name);
                for (const evolution of node.evolves_to) traverse(evolution);
            }

            traverse(responseData.chain);
            return result;
        }

        try {
            let response = await fetch(url);

            if (response.status === 200) {
                let data = await response.json();

                if (data) {
                    return getEvolutionChain(data);
                }
            }

        } catch(error) {
            console.log(error);
        }

        return [];
    }

    /**
     * Consulta todas las habilidades existentes y las almacena en localStorage.
     */
    static async getAbilitiesList() {
        try {
            let response = await fetch(config.url.abilities);

            if (response.status === 200) {
                let data = await response.json();
                let abilities = [];

                for (let result of data?.results ?? []) {
                    if (result?.url) {
                        let ability = await PokeAPI.getAbilitiesData(result.url);
                        if (ability !== null) abilities.push(ability);
                    }
                }

                if (abilities.length > 0) {
                    Store.insertAbilities(abilities);
                }

            } else {
                showAlert('No hemos podido cargar los datos.', 'danger');
            }
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * Consulta el detalle de la habilidad y devuelve un objeto con
     * toda la información requerida y limpia.
     */
    static async getAbilitiesData(url) {
        if (url) {
            try {
                let response = await fetch(url);

                if (response.status === 200) {
                    let data = await response.json();

                    if (data) {
                        let nameObject = data.names.find(item => item.language.name === 'es');
                        let description = data.flavor_text_entries
                            .filter(item => item.language.name === 'es')
                            .map(item => item.flavor_text);

                        return {
                            id: data.id,
                            name: data.name,
                            display: nameObject !== undefined ? nameObject.name : data.name,
                            description: Array.from(new Set(description)),
                        };
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        return null;
    }

    /**
     * Consulta todos los tipos existentes y las almacena en localStorage.
     */
    static async getTypesList() {
        try {
            let response = await fetch(config.url.types);

            if (response.status === 200) {
                let data = await response.json();
                let types = [];

                for (let result of data?.results ?? []) {
                    if (result?.url) {
                        let type = await PokeAPI.getTypeData(result.url);
                        if (type !== null) types.push(type);
                    }
                }

                if (types.length > 0) {
                    Store.insertTypes(types);
                }

            } else {
                showAlert('No hemos podido cargar los datos.', 'danger');
            }
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * Consulta el detalle de el tipo y devuelve un objeto con
     * toda la información requerida y limpia.
     */
    static async getTypeData(url) {
        if (url) {
            try {
                let response = await fetch(url);

                if (response.status === 200) {
                    let data = await response.json();

                    if (data) {
                        let nameObject = data.names.find(item => item.language.name === 'es');

                        return {
                            id: data.id,
                            name: data.name,
                            display: nameObject !== undefined ? nameObject.name : data.name,
                            damageRelations: data.damage_relations,
                        };
                    };
                }
            } catch(error) {
                console.log(error);
            }
        }

        return null;
    }

}
