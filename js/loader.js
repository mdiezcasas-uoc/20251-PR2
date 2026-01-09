
/**
 * Función encargada de la carga de datos desde la PokeAPI.
 * Únicamente consulta la API si no encuentra registros almacenados localmente.
 */
async function loader() {
        console.log('cargando...')

        // Verificar y cargar tipos. 
        let types = Store.getTypes();
        if (types.length === 0) {
            await PokeAPI.getTypesList();
        }
        
        // Verificar y cargar habilidades. 
        let abilities = Store.getAbilities();
        if (abilities.length === 0) {
            await PokeAPI.getAbilitiesList();
        }

        // Verificar y cargar pokemons.
        let pokemons = Store.getPokemons();
        if (pokemons.getPokemons.length == 0) {
            await PokeAPI.getPokemonList();
        }

        console.log('iniciando sesión...');

        console.log('entrando');
}
