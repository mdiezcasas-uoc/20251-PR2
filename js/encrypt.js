
/**
 * Función asíncrona para encriptar strings basado en el algoritmo 
 * SHA-256, en este caso se utiliza para la encriptación de contraseñas.
 */
async function encryptPassword(password) {
    if (password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
}
