
// Función que se ejecuta una vez cargado el DOM en la que se
// gestiona la verificación de la sesión y las verificaciones correspondientes.
document.addEventListener('DOMContentLoaded', (e) => {
    const activeUser = Store.getActiveUser();
    const path = window.location.pathname;

    const isLoginPage = path.includes('login.html');
    const isRegisterPage = path.includes('register.html');
    const isPublicPage = isLoginPage || isRegisterPage;

    const menuUserInfo = document.querySelector('#menuButton');

    if (activeUser != null) {
        menuUserInfo.textContent = activeUser.username;

        if (isPublicPage) {
            window.location.replace("./index.html");
        }
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
