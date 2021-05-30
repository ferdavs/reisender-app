import { injectable } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place, Feature } from "../models"

@injectable()
export class MockApi implements Api {
    private mockImage(id) {
        return "https://picsum.photos/id/" + id + "/300";
    }

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
    getFeatures(): Promise<ApiResult<Feature[]>> {
        let res = new ApiResult<Feature[]>(200, "{}");
        let features: Feature[] = [];
        for (let i = 0; i < 20; i++) {
            let feature = new Feature();
            feature.id = Math.round(Math.random() * 1000).toString();
            feature.imageUrl = this.mockImage(feature.id);
            feature.name = 'name' + feature.id;
            features.push(feature);
        }
        res.object = features;
        return Promise.resolve(res);
    }
    sendFeatures(user: User): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    recommend(): Promise<ApiResult<Place[]>> {
        let res = new ApiResult<Place[]>(200, "{}");
        let places: Place[] = [];
        for (let i = 0; i < 8; i++) {
            let place = new Place();
            place.id = Math.round(Math.random() * 1000).toString();
            place.imageUrl = this.mockImage(place.id);
            place.name = 'name' + place.id;
            place.description = "description of " + place.name;
            places.push(place);
        }
        res.object = places;
        return Promise.resolve(res);
    }
    wishListAdd(user:User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    wishListDelete(user:User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    visitedListAdd(user:User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    visitedListDelete(user:User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    placeDetail(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    search(query: String): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
}
