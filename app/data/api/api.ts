import { User, Place } from "../models"

export class ApiResult {
    httpStatus: number;
    json: String;
    object: any;
    success: boolean;
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
    login(user: User): Promise<ApiResult>;
    loginFacebook(): Promise<ApiResult>;
    register(user: User): Promise<ApiResult>;
    featureList(): Promise<ApiResult>;
    recommend(): Promise<ApiResult>;
    wishListAdd(place: Place): Promise<ApiResult>;
    wishListDelete(place: Place): Promise<ApiResult>;
    visitedListAdd(place: Place): Promise<ApiResult>;
    visitedListDelete(place: Place): Promise<ApiResult>;
    placeDetail(place:Place): Promise<ApiResult>;
    search(query: String): Promise<ApiResult>;
}
