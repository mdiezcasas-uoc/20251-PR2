
// Función que se ejecuta una vez cargado el DOM en la que se
// gestiona la verificación de la sesión y las verificaciones correspondientes.
document.addEventListener('DOMContentLoaded', (e) => {
    const activeUser = Store.getActiveUser();
    const path = window.location.pathname;

    const isLoginPage = path.includes('login.html');
    const isRegisterPage = path.includes('register.html');
    const isPublicPage = isLoginPage || isRegisterPage;

    const menuUserInfo = document.querySelector('#user-id');
    const wishlistCounter = document.querySelector('#wishlist-count');
    const teamListCounter = document.querySelector('#team-count');

    // Si hay un usuario activo, se añade el nombre al menú y se inicializan los contadores de sus listas.
    if (activeUser !== null) {
        menuUserInfo.innerHTML = '<i class="icon icon-user"></i>' + ' ' + activeUser.getUsername;
        wishlistCounter.textContent = activeUser.getWishList.length;
        teamListCounter.textContent = `${activeUser.getTeamList.length}/6`;

        // En caso de navegar a una página púlica se redirige al índice.
        if (isPublicPage) {
            window.location.replace("./index.html");
        }
    // En caso contrario, de no encontrar usuario, se comprueba si está en una página
    // pública, si no, se le redirige al login.
    } else {
        if (!isPublicPage) {
            window.location.replace("./login.html");
        }
    }
});

// Implementación y registro de la funcionalidad de cierre de sesión.
if (window.location.pathname != '/pages/login.html' ?? '/pages/register.html') {
    const logoutButton = document.querySelector('#logoutButton');
    logoutButton?.addEventListener('click',() => {
        localStorage.removeItem('active-user');
        window.location.replace("login.html");
    });
}
