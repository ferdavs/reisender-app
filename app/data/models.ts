export class User {
    id: string;
    name: string;
    username: string;
    password: string;
    fbData: object;
    loggedIn: boolean;
    firstLogin: boolean;
    wishList: Set<Place>;
    visited: Set<Place>;

    constructor(id = '0', username = '', password = '') {
        this.id = id;
        this.username = username;
        this.password = password;
        this.loggedIn = false;
        this.firstLogin = true;
    }
}

export class Place {
    id: string;
    name: string;
    imageUrl: string;
    wikiUrl: string;
    description: string;
    info: string;
}
