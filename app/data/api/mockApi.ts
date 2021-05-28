import { injectable } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place } from "../models"

@injectable()
export class MockApi implements Api {

    login(user: User): Promise<ApiResult<User>> {
        if (Math.random() < 0.1) {
            return Promise.reject(new ApiResult(404, '{"message":"not found"}'));
        }
        return Promise.resolve(new ApiResult(200, "{}"));
    }
    loginFacebook(): Promise<ApiResult<User>> {
        return Promise.resolve(new ApiResult());

    }
    register(user: User): Promise<ApiResult<User>> {
        let result = new ApiResult<User>();
        result.success = true;
        result.httpStatus = 200;
        result.object = user;
        return Promise.resolve(result);
    }
    getFeatures(): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    sendFeatures(values: string[]): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    recommend(): Promise<ApiResult<Place[]>> {
        let res = new ApiResult<Place[]>(200, "{}");
        let places: Place[] = [];
        for (let i = 0; i < 10; i++) {
            let place = new Place();
            place.id = i.toString();
            // place.imageUrl = "~/images/place_holder.png";
            place.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/22/Sun_Pyramid_05_2015_Teotihuacan_3304.JPG";
            place.name = 'name' + i;
            place.description = "description of " + place.name;
            places.push(place);
        }
        res.object = places;
        return Promise.resolve(res);
    }
    wishListAdd(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    wishListDelete(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    visitedListAdd(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    visitedListDelete(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    search(query: String): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
}
