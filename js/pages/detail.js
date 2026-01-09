
/* Este script carga la información del Pokémon seleccionado y lo muestra en la página de detalles. */

// Se obtienen los parámetros de búsqueda de la URL, extrayendo
// el campo "id" para identificar el pokemon que se está consultando.
let params = new URLSearchParams(window.location.search);
let id = Number(params.get('id'));

// Si no se ha encontrado ningún identificador, se redirige
// al usuario a la página principal.
if (id === null) window.location.replace("./index.html");

// Extracción del Pokémon.
let pokemon = pokemonList.getPokemonsByIds([id,]);

// Verificación del registro encontrado y aislamiento de la entidad
// específica del listado.
if (pokemon.length > 0) {
    pokemon = pokemon[0];

// Redirección a la página principal en caso de encontrar un array vacío, es decir
// no se ha encontrado el Pokémon según el id recibido.
} else {
    window.location.replace("./index.html");
}

// Selecciona el botón para volver atrás y registra la función a ejecutar
// en el evento click.
document.querySelector('#go-back').addEventListener('click', (e) => {

    // Si existe un historial de navegación se aplica la lógica correspondiente
    // para determinar a dónde navegar.
    if (window.navigation.canGoBack) {

        // Extracción de las últimas páginas en el historial de navegación.
        let entries = window.navigation.entries();

        // Como la última entrada es la página actual, se verifica que existe
        // una entrada anterior comprobando la longitud de todas las entradas recibidas.
        if (entries.length > 2) {
            let previousPage = entries[entries.length-2];
            if (previousPage?.url) {

                // Si la página anterior es el listado principal, navegamos mediante
                // history.back() para persistir el query string y así navegar
                // a una ruta que mantiene los filtros originales.
                if (previousPage.url.includes('/index.html')) {
                    history.back();

                // En cualquier otro caso, redirigimos al índice sin más.
                } else {
                    window.location.replace('./index.html');
                }
            }
        }

    // En caso contrario, se establece el caso por defecto de volver al
    // listado principal.
    } else {
        window.location.replace('./index.html');
    }
});

/* 
    Se rellenan los elementos con los datos del Pokémon.
*/

setTextContent('#pokemon-detail-name', pokemon.getDisplay);
setTextContent('#pokemon-detail-id', 'N.º ' + formatID(pokemon.getId, 4));

// Muestra o no los botones para ver las diferencias de género del Pokémon si las tiene.
if (pokemon.getHasGenderDifferences === false) {
    document.querySelector('#pokemon-detail-gender-differences').style.display = 'none';
    setTextContent(
        '#pokemon-detail-description', 
        pokemon.getDescription[getRandomIndex(pokemon.getDescription.length)]);
} else {
    setTextContent(
        '#pokemon-detail-description', 
        pokemon.getAttributeByIndex('description', 0));
}

setAttribute('#pokemon-detail-image', 'src', pokemon.getAttributeByIndex('sprites', 1));
setAttribute('#pokemon-detail-image', 'alt', pokemon.getDisplay);

setTextContent('#pokemon-detail-height', formatMetric(pokemon.getHeight) + ' m');
setTextContent('#pokemon-detail-weight', formatMetric(pokemon.getWeight) + ' kg');
setTextContent('#pokemon-detail-category', pokemon.getCategory);
setTextContent('#pokemon-detail-ability', pokemon.getAttributeByIndex('abilities', 0).display);

setTextContent('#pokemon-detail-ability', pokemon.getAttributeByIndex('abilities', 0).display);
setTextContent(
    '#pokemon-detail-ability-detail-name', 
    pokemon.getAttributeByIndex('abilities', 0).display);
setTextContent(
    '#pokemon-detail-ability-detail-description', 
    pokemon.getAttributeByIndex('abilities', 0)
        .description[getRandomIndex(pokemon.getAttributeByIndex('abilities', 0).description.length)]);


let typesContainer = document.querySelector('#pokemon-detail-types');
let types = createElement('ul', { class: ['types', ] }, typesContainer);
pokemon.getTypes.forEach(type => {
    createElement('li', { class: ['label', 'big', type.name] }, types, type.display);
});


const weaknessTable = calculateWeaknesses(pokemon.getTypes);
const weakTypes = allTypes.filter(type => weaknessTable[type.name] >= 2);
let weaknessContainer = document.querySelector('#pokemon-detail-weakness');
let weaknessTypes = createElement('ul', { class: ['types', ] }, weaknessContainer);
weakTypes.forEach(type => {
    createElement('li', { class: ['label', 'big', type.name] }, weaknessTypes, type.display);
});


let hp = document.querySelector('#hp');
displayStats(hp, pokemon.getStats.hp, 'hp');

let attack = document.querySelector('#attack');
displayStats(attack, pokemon.getStats.attack, 'attack');

let defense = document.querySelector('#defense');
displayStats(defense, pokemon.getStats.defense, 'defense');

let specialAttack = document.querySelector('#special-attack');
displayStats(specialAttack, pokemon.getStats['special-attack'], 'special-attack');

let specialDefense = document.querySelector('#special-defense');
displayStats(specialDefense, pokemon.getStats['special-defense'], 'special-defense');

let speed = document.querySelector('#speed');
displayStats(speed, pokemon.getStats.speed, 'speed');


let evolutionsContainer = document.querySelector('#pokemon-detail-evolutions');
pokemonList.getPokemonsByNames(pokemon.getEvolutions)
    .forEach(evolution => {
        let evolutionLink = createElement('a', 
            { href: [`detail.html?id=${evolution.getId}`], class: ['pokemon'] }, 
            evolutionsContainer);

        let evolutionImageContainer = createElement('div', { class: ['image'] }, evolutionLink);
        createElement(
            'img', 
            { src: [evolution.getAttributeByIndex('sprites', 0)], alt: [evolution.getDisplay], class: ['pokemon'] }, 
            evolutionImageContainer);

        let evolutionNameContainer = createElement('div', { class: ['name'] }, evolutionLink);
        createElement('p', { class: ['name'] }, evolutionNameContainer, evolution.getDisplay);
        createElement('p', { class: ['id'] }, evolutionNameContainer, 'N.º ' + formatID(evolution.getId, 4));

        let evolutionTypes = createElement('ul', { class: ['types', ] }, evolutionLink);
        evolution.getTypes.forEach(type => {
            createElement('li', { class: ['label', 'small', type.name] }, evolutionTypes, type.display);
        });

        // Divider
        let divider = createElement('div', { class: ['divider'], }, evolutionsContainer);
        createElement('img', { src: ['../img/angle-double-right.svg'], }, divider);
    }
);

/*
    Este bloque gestiona los botones que mostrarán las diferencias de género de 
    un Pokémon. En este caso, cambia la imagen y la descripción en función de si es macho o hembra.
*/
let maleButton = document.querySelector('#pokemon-detail-gender-differences-male');
let femaleButton = document.querySelector('#pokemon-detail-gender-differences-female');

maleButton.addEventListener('click', (e) => {
    if (!maleButton.classList.contains('active')) {
        maleButton.classList.add('active');
        femaleButton.classList.remove('active');
        setAttribute('#pokemon-detail-image', 'src', pokemon.getAttributeByIndex('sprites', 1));
        setTextContent('#pokemon-detail-description', pokemon.getAttributeByIndex('description', 0));
    }
});

femaleButton.addEventListener('click', (e) => {
    if (!femaleButton.classList.contains('active')) {
        femaleButton.classList.add('active');
        maleButton.classList.remove('active');
        setAttribute('#pokemon-detail-image', 'src', pokemon.getAttributeByIndex('sprites', 2));
        setTextContent('#pokemon-detail-description', pokemon.getAttributeByIndex('description', 1));
    }
});

/*
    Este bloque gestiona el detalle de la habilidad. Al hacer clic sobre el nombre de la hablidad,
    se muestra su descripción y al hacer clic al botón de cerrar, se oculta.
*/
let attrsContainer = document.querySelector('#pokemon-detail-attributes');
let showAbilityDetail = document.querySelector('#pokemon-detail-show-ability-detail');
let hideAbilityDetail = document.querySelector('#pokemon-detail-hide-ability-detail');

showAbilityDetail.addEventListener('click', (e) => {
    if (!attrsContainer.classList.contains('show-ability-detail')) {
        attrsContainer.classList.add('show-ability-detail');
    }
});

hideAbilityDetail.addEventListener('click', (e) => {
    if (attrsContainer.classList.contains('show-ability-detail')) {
        attrsContainer.classList.remove('show-ability-detail');
    }
});
