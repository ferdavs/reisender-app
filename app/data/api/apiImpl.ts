import { injectable } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place } from "../models"

@injectable()
export class ApiImpl implements Api {
    login(user: User): Promise<ApiResult<User>> {
        throw new Error("Method not implemented.");
    }
    loginFacebook(): Promise<ApiResult<User>> {
        throw new Error("Method not implemented.");
    }
    register(user: User): Promise<ApiResult<User>> {
        throw new Error("Method not implemented.");
    }
    featureList(): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    recommend(): Promise<ApiResult<Place[]>> {
        throw new Error("Method not implemented.");
    }
    wishListAdd(place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    wishListDelete(place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    visitedListAdd(place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    visitedListDelete(place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
    search(query: String): Promise<ApiResult<any>> {
        throw new Error("Method not implemented.");
    }
}
