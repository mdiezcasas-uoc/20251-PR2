
/* Script que gestiona la visualización de las listas. */

// Selección de los elementos de navegación.
const teamTab = document.querySelector('#team');
const wishlistTab = document.querySelector('#wishlist');

// Dependiendo de qué página está activa, se muestra la lista correspondiente
// y se marca el tab relacionado como activo.
if (isTeamListPage) {
    teamTab.classList.add('active');
    wishlistTab.classList.remove('active');

    // Oculta el botón de paginación ya que no es necesario en esta lista.
    document.querySelector('#next-page').style.display = 'none';

    displayPokeList(pokemonList.getPokemonsByIds(activeUser.getTeamList));

} else if (isWishListPage) {
    teamTab.classList.remove('active');
    wishlistTab.classList.add('active');

    displayPokeList(pokemonList.getPokemonsByIds(activeUser.getWishList));
}

// Registro de eventos de navegación.
teamTab?.addEventListener('click', (e) => { window.location.search = 'team'; });
wishlistTab?.addEventListener('click', (e) => { window.location.search = 'wishlist'; });
