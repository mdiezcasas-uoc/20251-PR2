
// Objeto contenedor para almacenar todos los filtros aplicados.
// Sigue el formato requerido en el método "filter" de la entidad PokemonList
// para ofrecer mayor comodidad de uso.
let filter = { 
    nameOrNumber: '',
    minWeight: 0,
    maxWeight: 1000,
    types: [],
    orderBy: 'id-asc'
};

// Selección de los elementos del filtro que no se generan de forma dinámica.
let searchBar = document.querySelector('input[type=search]');
let inputMinWeight = document.querySelector('input[name=min-weight]');
let inputMaxWeight = document.querySelector('input[name=max-weight]');
let inputOrderBy = document.querySelector('#order-by');

/**
* Inicializa la página del listado invocando la creación de los elementos y registrando
* los eventos correspondientes.
*/
function initializePage() {
    const filterTypes = document.querySelector('#filter-types-options');
    
    // Extrae los tipos de Pokémon de localStorage y se visualizan.
    for (let type of Store.getTypes()) {
        
        let container = createElement('div', { class: ['checkbox'], }, filterTypes);
        let input = createElement('input', { type: ['checkbox'], id: [type.name], name: [type.name] }, container);
        createElement('label', { 'for': [type.name], class: ['label', 'big', type.name] }, container, type.display);
        
        // Registra el evento change en cada tipo añadido.
        input.addEventListener('change', (e) => {

            // Para hacer seguimiento de los parámetros de búsqueda
            // se emplean los query string parameters de la URL.

            // En el caso de los tipos, dado que se puede filtrar por más de uno a la vez,
            // se debe de hacer seguimiento de los tipos ya incluidos y el filtro clicado.
            let url = new URL(window.location);
            let name = e.target.getAttribute('name');
            let currentSelection = url.searchParams.get('types');
            
            // Extrae los tipos seleccionados que aparecen en la URL, si no encuentra
            // ninguno, asigna un array vacío. 
            if (currentSelection !== null) {
                currentSelection = currentSelection.split('-').filter(s => s !== '');
            } else {
                currentSelection = [];
            }

            // Se añade o elimina del listado de tipos seleccionados 
            // basándose en su estado (marcado o no).
            if (e.target.checked) {
                if (!currentSelection.includes(name)) {
                    currentSelection.push(name); 
                }
            } else {
                let indexOf = currentSelection.indexOf(name);

                if (indexOf >= 0) {
                    currentSelection.splice(indexOf, 1);
                }
            }

            // Registro de la selección actual y sincronización
            // de la información a la URL.
            if (currentSelection.length > 0) {
                filter.types = currentSelection;
                url.searchParams.set('types', currentSelection.join('-'));
            } else {
                filter.types = [];
                if (Array.from(url.searchParams.keys()).includes('types')) {
                    url.searchParams.delete('types');
                }
            }

            // Se registra el estado de la nueva URL con los parámetros actualizados.
            // Esto permite al usuario la navegación a listados filtrados anteriores.
            history.pushState({}, '', url);

            // Vaciado del contenedor para reasignar la información según las
            // nuevas condiciones.  
            pokemonContainer.innerHTML = '';

            // Invocación de la función encargada de la visualización de listados.
            displayPokeList(pokemonList.filter(filter));
        });
    }

    /*
        Registro de eventos sobre otros inputs del filtro. 
    */
    searchBar?.addEventListener('input', (e) => {
        filter.nameOrNumber = e.target.value.trim();
    });

    inputMinWeight?.addEventListener('input', (e) => {
        filter.minWeight = parseInt(e.target.value);
    });
    
    inputMaxWeight?.addEventListener('input', (e) => {
        filter.maxWeight = parseInt(e.target.value);
    });

    // Registro de evento de ordenado y aplicación dinámica del mismo
    // mediante la llamada de la función de visualización y la sobreescritura 
    // previa del contenido.
    inputOrderBy?.addEventListener('change', (e) => {
        let url = new URL(window.location);

        filter.orderBy = e.target.value;
        url.searchParams.set('orderBy', e.target.value);
    
        history.pushState({}, '', url);
    
        pokemonContainer.innerHTML = '';
        displayPokeList(pokemonList.filter(filter));
    });

    // Gestión de aplicación de todos los filtros de búsqueda. 
    document.querySelector('#search-button')?.addEventListener('click', (e) => {
        let url = new URL(window.location);

        // Se emplea una desconstrucción del objeto de filtrado por claves y valores
        // para generar de forma simple y dinámica los parámetros de búsqueda de la URL.
        for (let [key, value] of Object.entries(filter)) {
            if (key === 'types') continue;
            else {
                url.searchParams.set(key, value);
            }
        }

        // Registro del nuevo enlace.
        history.pushState({}, '', url);

        // Vaciado y revisualización del listado con todos los filtros aplicados.
        pokemonContainer.innerHTML = '';
        displayPokeList(pokemonList.filter(filter));
    });
}

/**
* Se encarga de registrar todos los parámetros de búsqueda obtenidos de la URL,
* sincronizando la información a los elementos visuales (inputs, tipos, etc.) y al objeto
* que centraliza las condiciones de filtrado.
* 
* Tras el paso anterior, muestra el listado de Pokémons aplicando los filtros encontrados.
* 
* Es importante tener en cuenta que esta función sólo se debe invocar una vez los elementos del filtrado
* se han visualizado (tras la inicialización).
*/
function applyCurrentSearch() {
    let params = new URLSearchParams(window.location.search);

    for (let [key, value] of params.entries()) {
        if (key === 'types') {
            value = value ? value.split('-') : [];
            for (let typeName of value) {
                document.querySelector(`input[name=${typeName}]`).checked = true;
            }
        }

        if (key === 'nameOrNumber') searchBar.value = value;
        if (key === 'minWeight') {
            value = parseInt(value);
            inputMinWeight.value = value;
        }

        if (key === 'maxWeight') {
            value = parseInt(value);
            inputMaxWeight.value = value;
        }

        if (key === 'orderBy') inputOrderBy.value = value;

        filter[key] = value;
    }

    displayPokeList(pokemonList.filter(filter));
}

// Gestión del responsive, su princial objetivo es mostrar u ocultar los filtros.
// Variables que recogen los elementos necesarios para tal fin.
let filterButton = document.querySelector('#filter-button');
let filterByType = document.querySelector('.filter-by-type');
let bottomFilters = document.querySelector('.bottom-filters');

// Evita que queden ocultos los filtros al reescalar la ventana.
window.addEventListener('resize', (e) => {
    if (filterButton.checkVisibility()) {
        filterByType.style.display = 'none';
        bottomFilters.style.display = 'none';
    } else {
        filterByType.style.display = 'block';
        bottomFilters.style.display = 'block';
    }
});

// Cambia la visibilidad de los filtros al pulsar el botón en pantallas pequeñas.
filterButton.addEventListener('click', (e) => {
    if (!filterByType.checkVisibility() || !bottomFilters.checkVisibility()) {
        filterByType.style.display = 'block';
        bottomFilters.style.display = 'block';
    } else {
        filterByType.style.display = 'none';
        bottomFilters.style.display = 'none';
    }
});

// Invocaciones correspondientes a la inicialización de la página y
// de la información relacionada al filtrado.
initializePage();
applyCurrentSearch();
