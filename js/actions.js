
/**
 * Añade un Pokémon al listado indicado del usuario.
 */
function addPokemon(element, pokemon, listName) {
    if (listName === 'wishlist') {
        element.classList.remove('icon-heart-outlined');
        element.classList.add('icon-heart-colored');
        showAlert(`Se ha añadido ${pokemon.getDisplay} a la lista de deseos.`, 'success');
    } else {
        element.classList.remove('icon-pokeball-outlined');
        element.classList.add('icon-pokeball-colored');
        showAlert(`Se ha añadido ${pokemon.getDisplay} al equipo.`, 'success');
    }

    // Sincroniza el usuario activo en localStorage para reflejar los cambios recibidos. 
    activeUser.addToList(listName, pokemon.getId);
    Store.setActiveUser(activeUser);

    // Propaga el cambio al usuario que se encuentra en el listado.
    allUsers.forEach((user) => {
        if (user.getUsername === activeUser.getUsername) {
            user.addToList(listName, pokemon.getId);
        }
    });

    // Persiste los cambios del listado de usuarios.
    Store.updateUsers(allUsers);
}

/**
 * Elimina un Pokémon del listado indicado del usuario.
 */
function removePokemon(element, pokemon, listName) {
    if (listName === 'wishlist') {
        element.classList.remove('icon-heart-colored');
        element.classList.add('icon-heart-outlined');
        showAlert(`Se ha eliminado a ${pokemon.getDisplay} de la lista de deseos.`, 'info');
    } else {
        element.classList.remove('icon-pokeball-colored');
        element.classList.add('icon-pokeball-outlined');
        showAlert(`Se ha eliminado a ${pokemon.getDisplay} del equipo.`, 'info');
    }

    // Sincroniza el usuario activo en localStorage para reflejar los cambios recibidos.
    activeUser.removeFromList(listName, pokemon.getId);
    Store.setActiveUser(activeUser);

    // Propaga el cambio al usuario que se encuentra en el listado.
    allUsers.forEach((user) => {
        if (user.getUsername === activeUser.getUsername) {
            user.removeFromList(listName, pokemon.getId);
        }
    });

    // Persiste los cambios del listado de usuarios.
    Store.updateUsers(allUsers);
}
