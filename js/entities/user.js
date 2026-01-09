
class User {
    #name;
    #surname;
    #address;
    #city;
    #postalCode;
    #email;
    #username;
    #password;
    #teamList;
    #wishList;

    /* Constructor de la clase User */
    constructor({ name, surname, username, email, password, address, city, postalCode, teamList, wishList }) {
        this.setName = name;
        this.setSurname = surname;
        this.setUsername = username;
        this.setEmail = email;
        this.setPassword = password;
        this.setAddress = address;
        this.setCity = city;
        this.setPostalCode = postalCode;
        this.setTeamList = teamList;
        this.setWishList = wishList;
    }

    /* Getters y Setters */
    get getName() {
        return this.#name;
    }
    
    set setName(name) {
        this.#name = name;
    }

    get getSurname() {
        return this.#surname;
    }
    
    set setSurname(surname) {
        this.#surname = surname;
    }

    get getUsername() {
        return this.#username;
    }
    
    set setUsername(username) {
        this.#username = username;
    }

    get getEmail() {
        return this.#email;
    }
    
    set setEmail(email) {
        this.#email = email;
    }

    get getPassword() {
        return this.#password;
    }
    
    set setPassword(password) {
        this.#password = password;
    }

    get getAddress() {
        return this.#address;
    }
    
    set setAddress(address) {
        this.#address = address;
    }

    get getCity() {
        return this.#city;
    }
    
    set setCity(city) {
        this.#city = city;
    }

    get getPostalCode() {
        return this.#postalCode;
    }
    
    set setPostalCode(postalCode) {
        this.#postalCode = postalCode;
    }

    get getTeamList() {
        return this.#teamList;
    }
    
    set setTeamList(teamList) {
        this.#teamList = teamList;
    }

    get getWishList() {
        return this.#wishList;
    }
    
    set setWishList(wishList) {
        this.#wishList = wishList;
    }

    /**
     * Añade el id de un Pokémon a su respectiva lista si aún no está
     * incluido en ella.
     */
    addToList(type, pokemonId) {
        if (type === 'wishlist' && !this.#wishList.includes(pokemonId)) {
            this.#wishList.push(pokemonId);
        }

        if (type === 'team' && !this.#teamList.includes(pokemonId)) {
            this.#teamList.push(pokemonId);
        }
    }

    /**
     * Elimina el id de un Pokémon de su respectiva lista si está
     * incluido en ella.
     */
    removeFromList(type, pokemonId) {
        if (type === 'wishlist' && this.#wishList.includes(pokemonId)) {
            this.#wishList.splice(this.#wishList.indexOf(pokemonId), 1);
        }

        if (type === 'team' && this.#teamList.includes(pokemonId)) {
            this.#teamList.splice(this.#teamList.indexOf(pokemonId), 1);
        }
    }

    /**
     * Encripta la contraseña del usuario sobreescribiendo el valor original.
     */
    async hashPassword() {
        if (this.#password) {
            this.setPassword = await encryptPassword(this.#password);
        }
    }

    /**
     * Dada una contraseña sin encriptar, la encripta y la compara contra
     * la original almacenada.
     * Devuelve un valor boolean indicando si coinciden o no.
     * Esta funcionalidad se utiliza principalmente en el login.
     */
    async comparePasswords(password) {
        if (this.#password && password) {
            let hash = await encryptPassword(password);
            if (hash === this.#password) return true;
        }
        return false;
    }
    
    /**
     * Conveirte los atributos privados del usuario en un
     * objeto simple de JavaScript, permitiendo su uso de
     * forma más cómoda para operar con JSON.
     */
    toPlainObject() {
        return {
            name: this.getName,
            surname: this.getSurname,
            username: this.getUsername,
            email: this.getEmail,
            password: this.getPassword,
            address: this.getAddress,
            city: this.getCity,
            postalCode: this.getPostalCode,
            teamList: this.getTeamList,
            wishList: this.getWishList
        }
    }

    /**
     * Devuelve un string en formato JSON con todos los atributos
     * de la instancia. En caso de error, devuelve null por defecto.
     */
    toJSON() {
        try {
            return JSON.stringify(this.toPlainObject());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
