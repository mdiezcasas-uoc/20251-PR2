
class Store {

    /**
     * Extrae, lee y devuelve el usuario activo en sesión.
     * En caso de no encontrarlo, devuelve null por defecto.
     */
    static getActiveUser() {
        try {
            return JSON.parse(localStorage.getItem('active-user') || 'null');
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Extrae, lee y devuelve los usuarios almacenados.
     * En caso de no encontrar ninguno, devuelve un array vacío por defecto.
     */
    static getUsers() {
        try {
            return JSON.parse(localStorage.getItem('users') || '[]');
        } catch (error) {
            console.log(error);
            return new Array();
        }
    }

    /**
     * Extrae, lee y devuelve los usuarios almacenados, convirtiendo cada objeto simple
     * en una instancia de la clase User.
     * En caso de no encontrar ninguno, devuelve un array vacío por defecto.
     */
    static getUserInstances() {
        try {
            console.log(JSON.parse(localStorage.getItem('users') || '[]'));
            return JSON.parse(localStorage.getItem('users') || '[]').map(data => {
                console.log(data);
                return new User(...[data], [], []);
            });
        } catch (error) {
            console.log(error);
            return new Array();
        }
    }

    /**
     * Almacena el usuario activo en localStorage.
     * Principalmente se utiliza para indicar el usuario en sesión.
     * Si la operación ha ido bien devuelve true, en caso contrario devuelve false.
     */
    static setActiveUser(user) {
        try {
            let userData = user.toPlainObject();
            localStorage.setItem('active-user', JSON.stringify(userData));
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    /**
     * Inserta el nuevo usuario al listado de usuarios almacenados en localStorage.
     * Principalmente se utiliza al registrar usuarios.
     * Si la operación ha ido bien devuelve true, en caso contrario devuelve false.
     */
    static insertUser(user) {
        try {
            let userData = user.toPlainObject();
            let users = this.getUsers();
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}
