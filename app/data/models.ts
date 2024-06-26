export class User {
    id: string;
    name: string;
    username: string;
    password: string;
    fbData: any;
    loggedIn: boolean;
    firstLogin: boolean;
    wishlist: Place[];
    visited: Place[];
    features: Feature[];

    constructor(id = '0', username = '', password = '') {
        this.id = id;
        this.username = username;
        this.password = password;
        this.loggedIn = false;
        this.firstLogin = true;
        this.features = [];
        this.visited = [];
        this.wishlist = [];
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

export class PlaceLists {
    features: Place[];
    wishlist: Place[];
}

export class Feature {
    feature_id: string;
    name: string;
    image_url: string;
    private _selected: boolean = false;

    toggle() {
        this._selected = !this._selected;
        return this._selected;
    }
    get selected() {
        return this._selected;
    }
}
