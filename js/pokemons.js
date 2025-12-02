/*Este script permite cargar la información desde la API cuando sea necesario y crear el objeto en el localstorage.*/
/*Tened en cuenta que también debe de gestionar la paginación y los filtros.*/


let allPokemons = [];
let filteredPokemons = [];
let currentIndex = 0;
// Mostramos 12 por página
const pageSize = 12; // Número de pokémons por página que consideréis oportuno
// Total de pokémons a cargar,
const totalPokemons = 151; // P.e. 151, los de primera generación, pero podéis cambiarlo

let currentURL = `${config.apiBaseUrl}`+`${totalPokemons}`; // URL inicial para obtener los pokémons

let user;


async function getPokemons(url = currentURL) {
    // Debéis de obtener la lista de pokémons desde la API.
    // La URL por defecto es la que se encuentra en currentURL
    // Tened en cuenta que la API devuelve una lista con nombre y URL de detalles de cada pokémon.
    // Por lo tanto deberéis hacer una segunda llamada para obtener los detalles de cada pokémon (imagen, tipos, habilidades, etc).
    // Debéis de manejar errores
    // Uso de try-catch para manejo de errores, ya que es una función asíncrona y puede fallar la llamada a la API
    try {
        mostrarLoader();
        //...
        //Finalmente, debéis de retornar un array con los objetos de los pokémons obtenidos.
        //...
        ocultarLoader();
        return successfulPokemons;
    } catch (error) {
        console.error('Error general obteniendo pokémones:', error);
        ocultarLoader();
        throw error; // O retorna un array vacío: return [];
    }
}

    async function getPokemonDescription(speciesUrl) {
    // Debéis de obtener la descripción en español del Pokémon desde la URL de species obtenida en los detalles del Pokémon.
    // La descripción en español se encuentra en flavor_text_entries donde language.name es "es".
    // Debéis de manejar errores
    // Uso de try-catch para manejo de errores
    try {
        //...
        //...
        if (response.ok) {
            const speciesData = await response.json();
            
            // Busca descripción en español
            const spanishEntry = speciesData.flavor_text_entries.find(
                entry => entry.language.name === 'es'
            );
            
            return spanishEntry ? 
                spanishEntry.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ') : 
                "Descripción no disponible en español";
        }
        //...
        //...
        
    } catch (error) {
        console.error('Error crítico en getPokemonDescription:', error);
        return "Error al cargar descripción";
    }
}

// Función para mostrar el loader y desenfocar la pantalla
function mostrarLoader() {
    document.getElementById('loader').style.display = 'block';  // Mostrar el spinner
    document.body.classList.add('loading');  // Añadir clase para desenfocar el contenido
}

// Función para ocultar el loader y eliminar el desenfoque
function ocultarLoader() {
    document.getElementById('loader').style.display = 'none';  // Ocultar el spinner
    document.body.classList.remove('loading');  // Eliminar la clase de desenfoque
}

/* Añadir las funciones que consideréis necesarias*/





