
// Botón para ir a la página de login.
const toLoginButton = document.querySelector('#toLogin');
toLoginButton?.addEventListener('click', (e) => {
    window.location.replace("./login.html");
});

// Objeto al cual se mapean los valores del formulario.
let formValues = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    address: '',
    city: '',
    postalCode: ''
};

// Objeto para hacer el seguimiento del estado de la validación 
// de todos los campos del formulario.
let validations = {
    name: false,
    surname: false,
    username: false,
    email: false,
    password: false,
    address: false,
    city: false,
    postalCode: false
};

// Mapeo del valor y verificación del input name.
const nameInput = document.querySelector('#name');
nameInput?.addEventListener('input', (e) => {
    formValues.name = e.target.value;

    validations.name = !isEmpty(e.target) && hasMinLength(e.target, 2) && isTextOnly(e.target);
    toggleClass(e.target, validations.name);
});

// Mapeo del valor y verificación del input surname.
const surnameInput = document.querySelector('#surname');
surnameInput?.addEventListener('input', (e) => {
    formValues.surname = e.target.value;

    validations.surname = !isEmpty(e.target) && hasMinLength(e.target, 2);
    toggleClass(e.target, validations.surname);
});

// Mapeo del valor y verificación del input address.
const addressInput = document.querySelector('#address');
addressInput?.addEventListener('input', (e) => {
    formValues.address = e.target.value;

    validations.address = !isEmpty(e.target) && hasMinLength(e.target, 4);
    toggleClass(e.target, validations.address);
});

// Mapeo del valor y verificación tanto del select city y el input postalCode.
const citySelect = document.querySelector('#city');
const postalCodeInput = document.querySelector('#postalCode');
let isValidPostalCode = false;

// Ordenar el listado de ciudades alfabéticamente.
cities.sort((a, b) => a.name.localeCompare(b.name));

// Rellenar el select con los datos del listado de ciudades de config.js.
cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name;
    option.textContent = city.name;
    citySelect?.appendChild(option);
});

// Gestión del evento de selección de valor.
citySelect?.addEventListener('input', (e) => {
    formValues.city = e.target.value;

    // Se busca la ciudad por nombre. 
    const foundCity = cities.find(city => city.name === e.target.value);

    // Si se encuentra la ciudad, se autocompleta el código postal.
    if (foundCity) {
        postalCodeInput.value = foundCity.postalCode;
        formValues.postalCode = foundCity.postalCode;
        validations.postalCode = true;

    // Si no se encuentra la ciudad, se vacían los valores de los inputs.
    } else {
        postalCodeInput.value = '';
        formValues.postalCode = '';
        validations.postalCode = false;
    }

    validations.city = !isEmpty(e.target);
    toggleClass(e.target, validations.city);
    toggleClass(postalCodeInput, validations.postalCode);
});

// Gestión del input de código postal.
postalCodeInput?.addEventListener('input', (e) => {
    formValues.postalCode = e.target.value;

    // Se busca la ciudad por código postal.
    const foundCity = cities.find(city => city.postalCode === e.target.value);

    // Si se encuentra la ciudad, se autocompleta el select con la ciudad corresponidente.
    if (foundCity) {
        citySelect.value = foundCity.name;
        formValues.city = foundCity.name;
        isValidPostalCode = true;
        validations.city = true;
    
    // Si no se encuentra la ciudad, se vacían los valores de los inputs.
    } else {
        citySelect.value = '';
        formValues.city = '';
        isValidPostalCode = false;
        validations.city = false;
    }

    validations.postalCode = !isEmpty(e.target) && hasMinLength(e.target, 5) && isNumberOnly(e.target) && isValidPostalCode;
    toggleClass(e.target, validations.postalCode);
    toggleClass(citySelect, validations.city);
});

// Mapeo del valor y verificación del input username.
const usernameInput = document.querySelector('#username');
usernameInput?.addEventListener('input', (e) => {
    formValues.username = e.target.value.toLowerCase();

    validations.username = !isEmpty(e.target) && hasMinLength(e.target, 3) && !hasSpaces(e.target);
    toggleClass(e.target, validations.username);
});


// Mapeo del valor y verificación del input email.
const emailInput = document.querySelector('#email');
emailInput?.addEventListener('input', (e) => {
    // Autocompleta el email al detectar el @ al final del valor 
    // y no incluye la parte del dominio.
    if (e.target.value.trim().endsWith('@') && !e.target.value.includes('uoc.edu')) {
        e.target.value += 'uoc.edu';
    }

    formValues.email = e.target.value;

    validations.email = isEmail(e.target);
    toggleClass(e.target, validations.email);
});

// Mapeo del valor y verificación del input password.
const passwordInput = document.querySelector('#password');
passwordInput?.addEventListener('input', (e) => {
    formValues.password = e.target.value;
    
    validations.password = isPassword(e.target);
    toggleClass(e.target, validations.password);
});

// Selección del elemento form y registro de función 
// al evento submit.
const registerForm = document.querySelector('#registerForm');
registerForm?.addEventListener('submit', onRegisterSubmit);

// Función que gestiona el envío del formulario de registro.
async function onRegisterSubmit(e) {
    e.preventDefault();  // Previene la navegación por defecto del formulario.

    // Verifica que la cantidad de campos existentes para la validación es la misma que 
    // la cantidad de campos válidos, asegurando que no falta nada.
    // En caso de coinidir, se procede con la lógica del registro de usuario.
    if (Object.entries(validations).length === Object.values(validations).filter(valid => valid === true).length) {

        // Se extrae el listado de usuarios del localStorage.
        let users = Store.getUserInstances();

        // Se verifica que no exista un usuario con el mismo username.
        // En caso de detectar alguna coincidencia se notifica.
        if (users.some(user => user.getUsername === formValues.username)) {
            showAlert('Ya existe otro usuario con este nombre de usuario.', 'danger');
            validations.username = false;
            toggleClass(usernameInput, validations.username);

        // En caso contrario, se procede con la creación e inserción del nuevo registro.
        } else {
            let newUser = new User({...formValues});
            newUser.setWishList = new Array();
            newUser.setTeamList = new Array();
            await newUser.hashPassword();

            let isSaved = Store.insertUser(newUser);
            if (isSaved) {
                window.location.replace("./login.html");
            } else {
                showAlert('No hemos podido crear el usuario.', 'danger');
            }
        }

    // En caso de no coincidir, se informa la usuario.
    } else {
        showAlert('Por favor, rellena correctamente el formulario para crear una cuenta.', 'warning');
    }
}
