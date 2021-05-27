export class User {
    id: String;
    username: String;
    password: String;
    fbData: Object;
    loggedIn: Boolean;
    firstLogin: Boolean;
    wishList: Place[];
    visited: Place[];

    constructor(id = '0', username = '', password = '') {
        this.id = id;
        this.username = username;
        this.password = password;
        this.loggedIn = false;
        this.firstLogin = true;
    }
}

export class Place {
    id: String;
    name: String;
    imageUrl: String;
    wikiUrl: String;
    description: String;
}
