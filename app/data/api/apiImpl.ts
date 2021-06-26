import { injectable, inject } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place, Feature } from "../models"
import { Http, HttpResponse } from "@nativescript/core";
import { toJson, toQuery } from "~/util";

@injectable()
export class ApiImpl implements Api {
    private url: string;

    constructor(@inject("ApiUrl") url: string) {
        this.url = url;
    }

    private delete(url: string, param: any) {
        return Http.request({
            url: url + toQuery(param),
            method: 'DELETE',
        });
        // .then(r => r.content.toJSON());
        // .catch((e: HttpResponse) => new ApiResult<any>(e.statusCode, { message: e.content }));
    }

    private post(url: string, data: string) {
        return Http.request({
            url: url,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: data
        }).then(r => r.content.toJSON());
        // .catch((e: HttpResponse) => new ApiResult<any>(e.statusCode, { message: e.content }));
    }

    private put(url: string, data: string) {
        return Http.request({
            url: url,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            content: data
        }).then(r => r.content.toJSON());
        // .catch((e: HttpResponse) => new ApiResult<any>(e.statusCode, { message: e.content }));
    }

    private get(url: string, param: any) {
        return Http.request({
            url: url + toQuery(param),
            method: 'GET',
        }).then(r => r.content.toJSON());
        // .catch((e: HttpResponse) => new ApiResult<any>(e.statusCode, { message: e.content }));
    }

    private toPlace(w): Place {
        let p = new Place();
        p.id = w.place_id;
        p.name = w.name;
        p.imageUrl = w.image_url;
        return p;
    }

    private toFeature(f): Feature {
        let feat = new Feature();
        feat.feature_id = f.feature_id;
        feat.image_url = f.image_url;
        feat.name = f.name;
        return feat;
    }

    login(user: User): Promise<ApiResult<User>> {
        return this.post(this.url + "/api/users/login", toJson({ username: user.username, password: user.password }))
            .then(res => {
                user.firstLogin = res.firstlogin == 0;
                user.id = res.id;
            })
            .then(o => new ApiResult(200, user));
    }

    loginFacebook(user: User): Promise<ApiResult<User>> {
        return this.post(this.url + "/api/users/register", toJson(user))
            .then(r => new ApiResult(200, new User()));
    }

    register(user: User): Promise<ApiResult<User>> {
        return this.post(this.url + "/api/users/register", toJson({ username: user.username, password: user.password }))
            .then((u) => {
                user.id = u.id;
                return new ApiResult(200, user);
            });
    }

    getFeatures(): Promise<ApiResult<Feature[]>> {
        return Http.getJSON<Feature[]>(this.url + "/api/users/features")
            .then(res => res.map(f => this.toFeature(f)))
            .then(o => new ApiResult(200, o));
    }

    sendFeatures(user: User): Promise<ApiResult<any>> {
        return this.post(this.url + "/api/users/features", toJson({
            user_id: user.id,
            password: user.password,
            features: user.features.map(f => f.feature_id)
        }))
            .then(r => new ApiResult(200, user));
    }

    recommend(user: User): Promise<ApiResult<Place[]>> {
        return this.get(this.url + "/api/users/recommend/" + user.id, {})
            .then((res: any) => {
                let places = [
                    ...res.feature_based.map(p => this.toPlace(p)),
                    ...res.wish_based.map(p => this.toPlace(p))
                ];
                return new ApiResult(200, places);
            });
    }

    wishListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        let json = toJson({ user_id: user.id, password: user.password, place_id: place.id });
        return this.put(this.url + "/api/users/wishlist", json)
            .then(r => new ApiResult(200));
    }

    wishListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        let json = { user_id: user.id, password: user.password, place_id: place.id };
        return this.delete(this.url + "/api/users/wishlist", json)
            .then(r => new ApiResult(200));
    }

    wishListGet(user: User): Promise<ApiResult<Place[]>> {
        return this.get(this.url + "/api/users/wishlist", { user_id: user.id })
            .then(r => {
                let wishlist = r.map(p => this.toPlace(p));
                return new ApiResult(200, wishlist);
            });
    }

    visitedListGet(user: User): Promise<ApiResult<Place[]>> {
        return this.get(this.url + "/api/users/visited", { user_id: user.id })
            .then(r => {
                let visited = r.map(p => this.toPlace(p));
                return new ApiResult(200, visited);
            });
    }

    visitedListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        let json = toJson({ user_id: user.id, password: user.password, place_id: place.id })
        return this.put(this.url + "/api/users/visited", json)
            .then(r => new ApiResult(200));
    }

    visitedListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        let json = { user_id: user.id, password: user.password, place_id: place.id }
        return this.delete(this.url + "/api/users/visited", json)
            .then(r => new ApiResult(r.statusCode));
    }

    search(query: string): Promise<ApiResult<Place[]>> {
        return this.get(this.url + "/api/search", { q: query })
            .then((res: any) => {
                return new ApiResult(200, res.map(p => this.toPlace(p)))
            });
    }
}
