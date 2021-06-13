import { injectable, inject, named } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place, Feature } from "../models"
import SStorage from "../storage";

@injectable()
export class Repo implements Api {
    private api: Api;
    private store: SStorage;
    //for Api @named must be used here, cause Repo is default 
    constructor(@inject("Api") @named('mock') api: Api, @inject("SStorage") store: SStorage) {
        this.api = api;
        this.store = store;
    }

    login(user: User): Promise<ApiResult<User>> {
        return this.api.login(user);
    }
    loginFacebook(): Promise<ApiResult<User>> {
        return this.api.loginFacebook();
    }
    register(user: User): Promise<ApiResult<User>> {
        return this.api.register(user);
    }
    getFeatures(): Promise<ApiResult<Feature[]>> {
        return this.api.getFeatures();
    }
    sendFeatures(user: User): Promise<ApiResult<any>> {
        return this.api.sendFeatures(user);
    }
    recommend(user: User): Promise<ApiResult<Place[]>> {
        return this.api.recommend(user);
    }
    wishListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        return this.api.wishListAdd(user, place)
    }
    wishListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        return this.api.wishListDelete(user, place);
    }
    visitedListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        return this.api.visitedListAdd(user, place);
    }
    visitedListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        return this.api.visitedListDelete(user, place);
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        return this.api.placeDetail(place);
    }
    search(query: string): Promise<ApiResult<any>> {
        return this.api.search(query);
    }
}
