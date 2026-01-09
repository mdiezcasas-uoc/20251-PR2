
// Botón para ir a la página de registro.
const toRegisterButton = document.querySelector('#toRegister');
toRegisterButton?.addEventListener('click', (e) => {
    window.location.replace("./register.html");
});

// Objeto al cual se mapean los valores del formulario.
let formValues = {
    username: '',
    password: ''
};

// Objeto para hacer el seguimiento del estado de la validación 
// de todos los campos del formulario.
let validations = {
    username: false,
    password: false
};

// Extrae y almacena las instancias de usuarios del localStorage.
let users = Store.getUserInstances();

// Mapeo del valor y verificación del input username.
const usernameInput = document.querySelector('#username');
usernameInput?.addEventListener('input', (e) => {
    formValues.username = e.target.value.toLowerCase();
    validations.username = !isEmpty(e.target);
});

// Mapeo del valor y verificación del input password.
const passwordInput = document.querySelector('#password');
passwordInput?.addEventListener('input', (e) => {
    formValues.password = e.target.value;
    validations.password = !isEmpty(e.target);
});

// Selección del elemento form y registro de función 
// al evento submit.
const loginForm = document.querySelector('#loginForm');
loginForm?.addEventListener('submit', onLoginSubmit);

// Función que gestiona el envío del formulario de login.
async function onLoginSubmit(e) {
    e.preventDefault();  // Previene la navegación por defecto del formulario.

    // Verifica que la cantidad de campos existentes para la validación es la misma que 
    // la cantidad de campos válidos, asegurando que no falta nada.
    // En caso de no coincidir, se informa al usuario. 
    if (Object.entries(validations).length != Object.values(validations).filter(valid => valid === true).length) {
        showAlert('Por favor, rellena todos los campos del formulario para iniciar sesión.', 'warning');
        validations.username = false;
        validations.password = false;
        toggleClass(usernameInput, validations.username);
        toggleClass(passwordInput, validations.password);
        return;
    }

    // Búsqueda del usuario por nombre de usuario.
    const foundUser = users.find(user => user.getUsername === formValues.username);

    // Gestión de la lógica de inicio de sesión.
    if (foundUser) {

        // Verificación de la contraseña.
        if (foundUser.comparePasswords(formValues.password)) {
            showAlert('Login correcto.', 'success');
            toggleClass(usernameInput, true);
            toggleClass(passwordInput, true);

            mostrarLoader();

            // Carga información desde la API si el usuario
            // aún no tiene los datos en su navegador.
            await loader();

            // Se almacena el usuario en sesión.
            Store.setActiveUser(foundUser);

            // Se espera 1 segundo y se redirecciona al usuario a la página
            // correspondiente.
            setTimeout(() => window.location.replace("./index.html"), 1000);

        // Notificación de credenciales incorrectas.
        } else {
            showAlert('Usuario o contraseña incorrectos.', 'danger');
            toggleClass(usernameInput, false);
            toggleClass(passwordInput, false);
        }

    // Si no se ha encontrado ningún registro, se notifica al usuario.
    } else {
        showAlert('No existe ningún usuario con ese nombre.', 'danger');
        toggleClass(usernameInput, false);
        toggleClass(passwordInput, false);
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
