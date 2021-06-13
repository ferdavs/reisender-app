import { injectable, inject } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place, Feature } from "../models"

@injectable()
export class ApiImpl implements Api {
    private url: string;

    constructor(@inject("ApiUrl") url: string) {
        this.url = url;
    }

    login(user: User): Promise<ApiResult<User>> {
        throw new Error("Method not implemented.");
    }
    loginFacebook(): Promise<ApiResult<User>> {
        throw new Error("Method not implemented.");
    }
    register(user: User): Promise<ApiResult<User>> {
        throw new Error("Method not implemented.");
    }
    getFeatures(): Promise<ApiResult<Feature[]>> {
        // return Http.getJSON<Feature[]>(url+"/api/getFeatureList")
        //     .then(o => new ApiResult(200, o))
        //     .catch(e => new ApiResult(503));
        throw new Error("Method not implemented.");
    }
    sendFeatures(user: User): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    recommend(): Promise<ApiResult<Place[]>> {
        throw new Error("Method not implemented.");
    }
    wishListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    wishListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    visitedListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    visitedListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    search(query: string): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
}
