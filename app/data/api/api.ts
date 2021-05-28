import { User, Place } from "../models"

export class ApiResult<T> {
    httpStatus: number;
    _json: string;
    object: T;
    success: boolean;
    constructor(httpStatus = 200, json = "{}") {
        this.httpStatus = httpStatus;
        this.json = json;
        this.success = 300 > httpStatus && httpStatus >= 200;
    }
    set json(val: string) {
        this._json = val;
        this.object = val === null || val === undefined ? {} : JSON.parse(val);
    }
    get json(): string {
        return this._json;
    }
}

// POST   /api/user/login (user obejct)
// POST   /api/user/register (user obejct)
// POST   /api/user/feature_list (onbaording feature list)

// GET    /api/user/wishlist (place array)
// PUT    /api/user/wishlist (place object)
// DELETE /api/user/wishlist/<place_id>

// GET    /api/user/visited (place array)
// PUT    /api/user/visited (place object)
// DELETE /api/user/visited/<place_id>

// GET    /api/place/recommend (place array)
// GET    /api/search?query=
export interface Api {
    login(user: User): Promise<ApiResult<User>>;
    loginFacebook(): Promise<ApiResult<User>>;
    register(user: User): Promise<ApiResult<User>>;
    getFeatures(): Promise<ApiResult<any>>;
    sendFeatures(values:string[]): Promise<ApiResult<any>>;
    recommend(): Promise<ApiResult<Place[]>>;
    wishListAdd(place: Place): Promise<ApiResult<any>>;
    wishListDelete(place: Place): Promise<ApiResult<any>>;
    visitedListAdd(place: Place): Promise<ApiResult<any>>;
    visitedListDelete(place: Place): Promise<ApiResult<any>>;
    placeDetail(place: Place): Promise<ApiResult<Place>>;
    search(query: String): Promise<ApiResult<Place[]>>;
}
