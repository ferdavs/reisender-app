import { injectable, inject, named } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place, Feature } from "../models"

@injectable()
export class Repo implements Api {
    _api: Api;
    constructor(@inject("Api") @named('impl') api: Api) {
        this._api = api;
    }

    login(user: User): Promise<ApiResult<User>> {
        return this._api.login(user);
    }
    loginFacebook(): Promise<ApiResult<User>> {
        return this._api.loginFacebook();
    }
    register(user: User): Promise<ApiResult<User>> {
        return this._api.register(user);
    }
    getFeatures(): Promise<ApiResult<Feature[]>> {
        return this._api.getFeatures();
    }
    sendFeatures(user:User): Promise<ApiResult<any>> {
        return this._api.sendFeatures(user);
    }
    recommend(user:User): Promise<ApiResult<Place[]>> {
        return this._api.recommend(user);
    }
    wishListAdd(user:User, place: Place): Promise<ApiResult<any>> {
        return this._api.wishListAdd(user, place)
    }
    wishListDelete(user:User, place: Place): Promise<ApiResult<any>> {
        return this._api.wishListDelete(user, place);
    }
    visitedListAdd(user:User, place: Place): Promise<ApiResult<any>> {
        return this._api.visitedListAdd(user, place);
    }
    visitedListDelete(user:User, place: Place): Promise<ApiResult<any>> {
        return this._api.visitedListDelete(user, place);
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        return this._api.placeDetail(place);
    }
    search(query: String): Promise<ApiResult<any>> {
        return this._api.search(query);
    }
}
