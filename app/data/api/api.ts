import { User, Place } from "../models"

export class ApiResult {
    httpStatus: number;
    json: String;
    object: any;
    success: boolean;
}

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
