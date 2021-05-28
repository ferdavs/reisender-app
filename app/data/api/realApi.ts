import { injectable, inject, named } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place } from "../models"

@injectable()
export class RealApi implements Api {
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
    getFeatures(): Promise<ApiResult<any>> {
        return this._api.getFeatures();
    }
    sendFeatures(values: string[]): Promise<ApiResult<any>> {
        return this._api.sendFeatures(values);
    }
    recommend(): Promise<ApiResult<Place[]>> {
        return this._api.recommend();
    }
    wishListAdd(place: Place): Promise<ApiResult<any>> {
        return this._api.wishListAdd(place)
    }
    wishListDelete(place: Place): Promise<ApiResult<any>> {
        return this._api.wishListDelete(place);
    }
    visitedListAdd(place: Place): Promise<ApiResult<any>> {
        return this._api.visitedListAdd(place);
    }
    visitedListDelete(place: Place): Promise<ApiResult<any>> {
        return this._api.visitedListDelete(place);
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        return this._api.placeDetail(place);
    }
    search(query: String): Promise<ApiResult<any>> {
        return this._api.search(query);
    }
}
