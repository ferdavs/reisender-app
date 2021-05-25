import { injectable } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place } from "../models"

@injectable()
export class MockApi implements Api {
    login(user: User): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    loginFacebook(): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());

    }
    register(user: User): Promise<ApiResult> {
        let result = new ApiResult();
        result.success = true;
        result.httpStatus = 200;
        result.object = user;
        return Promise.resolve(result);
    }
    featureList(): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    recommend(): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    wishListAdd(place: Place): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    wishListDelete(place: Place): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    visitedListAdd(place: Place): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    visitedListDelete(place: Place): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    placeDetail(place: Place): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
    search(query: String): Promise<ApiResult> {
        return Promise.resolve(new ApiResult());
    }
}
