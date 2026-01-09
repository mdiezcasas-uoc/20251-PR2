
/* Este script contiene funciones generales que se utilizan en distitnas partes del proyecto. */

/*
    Constantes y variables globales.
*/
const pokemonList = Store.getPokemons();
const activeUser = Store.getActiveUser();
const allUsers = Store.getUserInstances();
const allTypes = Store.getTypes();

const pokemonContainer = document.querySelector('#pokemon-container');
const wishlistCounter = document.querySelector('#wishlist-count');
const teamListCounter = document.querySelector('#team-count');

const pathList = window.location.search;
const isTeamListPage = pathList.includes('team');
const isWishListPage = pathList.includes('wishlist');

const pageSizeDefault = 12;
var nextPage = null;

/**
 * Función auxiliar para crear elementos del DOM junto con los atributos recibidos
 * y el contenido indicado. En caso de recibir un elemento padre, se le añade como
 * hijo el elemento creado.
 */
function createElement(tag, attrs, parent = null, content = '') {
    let el = document.createElement(tag);
    el.textContent = content;

    for (let [name, values] of Object.entries(attrs)) {
        el.setAttribute(name, values.join(' '));
    }

    if (parent !== null) {
        parent.appendChild(el);
    }

    return el;
}

/**
 * Selecciona y añade contenido a un elemento.
 */
function setTextContent(selector, content) {
    let element = document.querySelector(selector);
    if (element) element.textContent = content;
}

/**
 * Selecciona y añade un atributo a un elemento.
 */
function setAttribute(selector, attr, value) {
    let element = document.querySelector(selector);
    if (element) element.setAttribute(attr, value);
}

/**
 * Devuelve un número aleatorio entre 0 y la longitud del listado.
 */
function getRandomIndex(listLength) {
    return Math.floor(Math.random() * listLength);
}

/**
 * Función recursiva para formatear el identificador de un Pokémon.
 * Convierte un número entero normal en un string con 0 como prefijo
 * hasta la longitud indicada.
 */
function formatID(id, maxLength) {
    let idString = String(id);

    if (idString.length >= maxLength) {
        return idString;
    } else {
        return formatID('0' + idString, maxLength);
    }
}

/**
 * Conversión de datos numéricos correspondientes a algunos atributos
 * de un Pokémon. Se usa para poder mostar el peso y la altura.
 */
function formatMetric(number) {
    let result = number/10;
    return result.toFixed(1).toString().replace('.', ',');
}

/**
 * Normalización de los valores de las estadísticas de un Pokémon.
 */
function formatStats(statName, statValue, itemsCount) {
    let max;
    let percentage;
    let step = 100 / itemsCount;
    let result;

    switch (statName) {
        case 'hp':
            max = 255;
            break;
        case 'attack':
            max = 190;
            break;
        case 'defense':
            max = 230;
            break;
        case 'special-attack':
            max = 194;
            break;
        case 'special-defense':
            max = 230;
            break;
        case 'speed':
            max = 200;
            break;
        default:
            max = 0;
            break;
    }

    percentage = (statValue * 100) / max;
    percentage = percentage.toFixed(2);

    if (percentage > 0) {
        for (let i = 1; i <= itemsCount; i++) {
            const limit = step * i; 

            if (percentage <= limit) {
                result = i;
                break;
            }
        }
    }

    return result;
}

/**
 * Visualización de las estadísicas.
 */
function displayStats(parent, stat, statName) {
    let statList = [];

    parent.childNodes.forEach(item => {
        if (item.tagName === 'LI' && !item.classList.contains('stat-name')) {
            statList.push(item);
        }
    });
    
    for (let i = 0; i < formatStats(statName, stat, statList.length); i++) {
        statList[i].classList.add('active');
    }
}

/**
 * Computación de debilidades según tipo.
 */
function calculateWeaknesses(pokemonTypes) {
    let multipliers = Object.fromEntries(allTypes.map(type => [type.name, 1]));

    const applyDamageRelations = (relations) => {
        // Debilidades (x2)
        relations.double_damage_from.forEach(type => {
            if (multipliers[type.name]) multipliers[type.name] *= 2;
        });

        // Resistencias (x0.5)
        relations.half_damage_from.forEach(type => {
            if (multipliers[type.name]) multipliers[type.name] *= 0.5;
        });

        // Inmunidades (x0)
        relations.no_damage_from.forEach(type => {
            if (multipliers[type.name]) multipliers[type.name] *= 0;
        });
    };

    let typesData = [];
    let pokemonTypesNames = pokemonTypes.map(item => item.name);

    for (let typeName of pokemonTypesNames) {
        typesData.push(allTypes.find(type => typeName === type.name));
    }

    typesData.forEach(typeInfo => {
        applyDamageRelations(typeInfo.damageRelations);
    });

    return multipliers;
}

/**
 * Visualización de un listado de Pokémons aplicando la paginación correspondiente.
 */
function displayPokeList(list, currentPage = 0) {

    // Selección del botón para mostrar más elementos.
    let nextPageButton = document.querySelector('#next-page');

    // Computación dinámica, basada en la página a mostrar, de la existencia 
    // de más registros después de la página actual / indicada.
    if (list.length > pageSizeDefault * (currentPage + 1)) {
        nextPage = currentPage + 1;
        nextPageButton.style.display = 'block';
    } else {
        nextPage = null;
        nextPageButton.style.display = 'none';
    }

    if (list.length > 0) {

        // Visualización de la página de instancias Pokémon. Se genera cada elemento de forma dinámica
        // y se inserta dentro del mismo contenedor.
        for (let pokemon of paginateArray(list, pageSizeDefault, currentPage)) {
    
            let pokemonElementId = 'pokemon-';

            if (isTeamListPage) {
                pokemonElementId += 'team-';
            }

            if (isWishListPage) {
                pokemonElementId += 'wishlist-';
            }

            let card = createElement('div', 
                { id: [pokemonElementId + pokemon.getId, ], class: ['card', ] }, 
                pokemonContainer);
    
            let actions = createElement('div', { class: ['actions', ] }, card);
            let btnWishlist = createElement('button', { 
                type: ['button', ],
                id: [`wishlist-button-${pokemon.getId}`, ],
                'aria-label': ['Lista de deseos', ],
            }, actions);
    
            if (activeUser.getWishList && activeUser.getWishList.length > 0) {
                if (activeUser.getWishList.includes(pokemon.getId)) {
                    createElement('i', { class: ['icon', 'icon-heart-colored' ] }, btnWishlist);
                } else {
                    createElement('i', { class: ['icon', 'icon-heart-outlined' ] }, btnWishlist);
                }
            } else {
                createElement('i', { class: ['icon', 'icon-heart-outlined' ] }, btnWishlist);
            }

            let btnTeam = createElement('button', { 
                type: ['button', ],
                id: [`team-button-${pokemon.getId}`, ],
                'aria-label': ['Mi equipo', ],
            }, actions);
    
            if (activeUser.getTeamList && activeUser.getTeamList.length > 0) {
                if (activeUser.getTeamList.includes(pokemon.getId)) {
                    createElement('i', { class: ['icon', 'icon-pokeball-colored' ] }, btnTeam);
                } else {
                    createElement('i', { class: ['icon', 'icon-pokeball-outlined' ] }, btnTeam);
                }
            } else {
                createElement('i', { class: ['icon', 'icon-pokeball-outlined' ] }, btnTeam);
            }
    
            let content = createElement('div', { class: ['content', ] }, card);
    
            let imgLink = createElement('a', { href: [`detail.html?id=${pokemon.getId}`, ] }, content);
            createElement('img', { 
                src: [pokemon.getSprites[0], ],
                alt: [pokemon.getDisplay, ],
            }, imgLink);

            let textContent = createElement('div', { class: ['textContent', ] }, content);
    
            createElement('p', { class: ['id', ] }, textContent, 'N.º ' + formatID(pokemon.getId, 4));
    
            let nameLink = createElement('a', { href: [`detail.html?id=${pokemon.getId}`, ] }, textContent);
            createElement('p', { class: ['name', ] }, nameLink, pokemon.getDisplay);
    
            let types = createElement('ul', { class: ['types', ] }, textContent);
            pokemon.getTypes.forEach(type => {
                createElement('li', { class: ['label', 'default', type.name] }, types, type.display);
            });
        }
    
        // Registro de los eventos de listado de deseos y mi equipo a cada
        // elemento del listado. 
        eventHandler(list);

    // En caso de no encontrar ningún Pokémon, se muestra un mensaje informando al usuario.
    } else {
       createElement('p', { class: ['voidList', ] }, pokemonContainer, 'No hay ningún Pokémon en esta lista.');
    }

    // Registro del evento click al botón de cargar más registros.
    // Se añade con cada visualización para poder asignar de forma dinámica la siguiente página 
    // a mostrar.
    nextPageButton?.addEventListener('click', (e) => {
        if (nextPage !== null) {
            displayPokeList(list, nextPage);
        }
    });
}

/**
 * Deulve un listado de los elementos del array de la página indicada
 * según el tamaño especificado.
 */
function paginateArray(array, pageSize, pageNumber) {
  return array.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
};

/**
 * Elimina del DOM la tarjeta de un Pokémon.
 */
function removePokemonCard(id, type) {
    let pokemonElementId = '#pokemon-';

    if (type === 'team') {
        pokemonElementId += 'team-';
    }

    if (type === 'wishlist') {
        pokemonElementId += 'wishlist-';
    }

    pokemonElementId += id;

    let card = document.querySelector(pokemonElementId);
    if (card !== null) {
        card.parentNode.removeChild(card);
    }
}

/**
 * Registra los eventos de lista de deseos y mi equipo a cada elemento Pokémon
 * visualizado en la página.
 */
function eventHandler(list) {

    list.forEach(pokemon => {

        // Lista de deseos.
        document.querySelector('#wishlist-button-' + pokemon.getId)?.addEventListener('click', (e) => {

            // Extracción del identificador del atributo id.
            let parentId = e.target.parentNode.id.substring(e.target.parentNode.id.lastIndexOf('-')+1);
            let wishlist = activeUser.getWishList;

            // Implementación de la lógica para añadir o quitar el Pokémon. 
            if (pokemon.getId == parentId) {
                if (!wishlist.find(pokemonId => pokemonId == pokemon.getId)) {
                    addPokemon(e.target, pokemon, 'wishlist');
                } else {
                    removePokemon(e.target, pokemon, 'wishlist');
                    removePokemonCard(pokemon.getId, 'wishlist');
                }
        
                wishlistCounter.textContent = wishlist.length;
            }

        });

        // Mi equipo.
        document.querySelector('#team-button-' + pokemon.getId)?.addEventListener('click', (e) => {
        
            // Extracción del identificador del atributo id.
            let parentId = e.target.parentNode.id.substring(e.target.parentNode.id.lastIndexOf('-')+1);
            let teamList = activeUser.getTeamList;

            // Implementación de la lógica para añadir o quitar el Pokémon.
            if (pokemon.getId == parentId) {
                if (teamList.length < 6) {
                    if (!teamList.find(pokemonId => pokemonId == pokemon.getId)) {
                        addPokemon(e.target, pokemon, 'team');
                    } else {
                        removePokemon(e.target, pokemon, 'team');
                        removePokemonCard(pokemon.getId, 'team');
                    }
                } else {
                    if (!teamList.find(pokemonId => pokemonId == pokemon.getId)) {
                        showAlert(`No se pueden añadir más Pokémons al equipo.`, 'danger');
                    } else {
                        removePokemon(e.target, pokemon, 'team');
                        removePokemonCard(pokemon.getId, 'team');
                    }
                }
        
                teamListCounter.textContent = `${teamList.length}/6`;
            }
        });

})}
