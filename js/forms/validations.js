
// Validaciones de los inputs, se hace en un archivo 
// separado y único para poder reutilizar la lógica facilmente.

// Compuerba si un input está vacío.
function isEmpty (input) {
    return input.value.trim() ? false : true;
}

// Comprueba si el valor de un input tiene una longitud mayor o igual al mínimo.
function hasMinLength (input, min) {
    return input.value.trim().length >= min;
}

// Comprueba si el valor de un input es únicamente texto,
// es decir, no contiene ni números ni caracteres especiales,
// pero sí puede contener espacios.
function isTextOnly (input) {
    return /^[a-z\sáàéèíóòú]+$/i.test(input.value);
}

// Comprueba si el valor del input es únicamente números.
function isNumberOnly (input) {
    return /^[0-9]+$/.test(input.value);
}

// Comprueba si el valor de un input contiene espacios.
function hasSpaces (input) {
    return /^[a-zA-Z0-9]+\s+[a-zA-Z0-9]+$/.test(input.value);
}

// Comprueba si el valor de un input concuerda con el formato de un email.
function isEmail (input) {
    return /^([a-zA-Z0-9]+\.?[a-zA-Z0-9\_\-]+)\@([a-zA-Z0-9]+\.?[a-zA-Z0-9\_\-]+)\.[a-zA-Z]{2,}$/.test(input.value);
}

// Comprueba si el valor de un input concuerda con el formato de una contraseña.
function isPassword (input) {
    return /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}$/.test(input.value);
}

// Aplica las clases de 'invalid' si el input no cumple con los requisitos y 'valid' si los cumple. 
function toggleClass (element, isValid) {
    if (element) {
        if (isValid) {
            element.classList.add('valid');
            element.classList.contains('invalid') ? element.classList.remove('invalid') : '';
        } else {
            element.classList.add('invalid');
            element.classList.contains('valid') ? element.classList.remove('valid') : '';
        }
    }
}
