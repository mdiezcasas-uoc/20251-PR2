
// Selección de los elementos que componen los avisos.
const closeButton = document.querySelector('#closeAlertButton');
const alert = document.querySelector('#alert');
const alertContent = document.querySelector('#alert-content');

// Contador para cerrar automáticamente las alertas.
let alertCounter;

// Gestión del evento de cierre del alert.
closeButton.addEventListener('click', (e) => {
    hideAlert();
});

// Visualización de un alert según el tipo y el mensaje especificado.
function showAlert (message, type) {
    alert.classList.remove('hidden');
    alert.classList.add('show');

    alert.classList.remove('success');
    alert.classList.remove('info');
    alert.classList.remove('warning');
    alert.classList.remove('danger');
    alert.classList.add(type ?? 'danger');

    alertContent.textContent = message;
    alertCounter = setTimeout(hideAlert, 5000);
}

// Oculta un alert.
function hideAlert () {
    alert.classList.remove('show');
    alert.classList.add('hidden');
    window.clearTimeout(alertCounter);
}
