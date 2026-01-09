
class Store {

    /**
     * Extrae, lee y devuelve el usuario activo en sesión como instancia de la clase User.
     * En caso de no encontrarlo, devuelve null por defecto.
     */
    static getActiveUser() {
        try {
            let data = JSON.parse(localStorage.getItem('active-user') || 'null');
            return data === null ? null : new User(data);
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
            return JSON.parse(localStorage.getItem('users') || '[]').map(data => {
                return new User(...[data], [], []);
            });
        } catch (error) {
            console.log(error);
            return new Array();
        }
    }

    /**
     * Extrae, lee y devuelve los pokemons almacenados.
     * En caso de no encontrar ninguno, devuelve una instancia vacía de PokemonList por defecto.
     */
    static getPokemons() {
        try {
            let pokemons = JSON.parse(localStorage.getItem('pokemons') || '[]')
                .map(data => new Pokemon(data));

            if (pokemons.length > 0) {
                let list = new PokemonList();
                list.setPokemons = pokemons;
    
                return list;
            }

        } catch (error) {
            console.log(error);
        }
        
        return new PokemonList();
    }


    /**
     * Extrae, lee y devuelve los tipos almacenados.
     * En caso de no encontrar ninguno, devuelve un array vacío por defecto.
     */
    static getTypes() {
        try {
            return JSON.parse(localStorage.getItem('types') || '[]');
        } catch (error) {
            console.log(error);
            return new Array();
        }
    }

    /**
     * Extrae, lee y devuelve las habilidades almacenadas.
     * En caso de no encontrar ninguna, devuelve un array vacío por defecto.
     */
    static getAbilities() {
        try {
            return JSON.parse(localStorage.getItem('abilities') || '[]');
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

    static updateUsers(userInstanceList) {
        try {
            let usersData = userInstanceList.map(user => user.toPlainObject());
            localStorage.setItem('users', JSON.stringify(usersData));
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

    /**
     * Inserta pokemons al listado de pokemons almacenados en localStorage.
     * Si la operación ha ido bien devuelve true, en caso contrario devuelve false.
     */
    static insertPokemons(pokemons) {
        try {
            localStorage.setItem('pokemons', JSON.stringify(pokemons));
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    /**
     * Inserta habilidades al listado de habilidades almacenadas en localStorage.
     * Si la operación ha ido bien devuelve true, en caso contrario devuelve false.
     */
    static insertAbilities(abilities) {
        try {
            localStorage.setItem('abilities', JSON.stringify(abilities));
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    /**
     * Inserta tipos al listado de tipos almacenados en localStorage.
     * Si la operación ha ido bien devuelve true, en caso contrario devuelve false.
     */
    static insertTypes(types) {
        try {
            localStorage.setItem('types', JSON.stringify(types));
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}
