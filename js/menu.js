/* Script que gestiona el comportamiento responsive del navbar. */

// Selección de los elementos importantes del navbar.
const burguerButton = document.querySelector('.menu-button');
const menu = document.querySelector('.navbar-right');

// Oculta el menú por defecto.
// Esto solamente afecta en el caso de páginas pequeñas y está
// controlado por CSS casi por completo.
if (menu.classList.contains('show')) {
    menu.classList.remove('show');
}

// Enseña u oculta el menú al pulsar el botón.
burguerButton.addEventListener('click', (e) => {
    menu.classList.toggle('show');
    burguerButton.classList.toggle('close');
});
