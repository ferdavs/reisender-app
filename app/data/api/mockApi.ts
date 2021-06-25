import { injectable } from "inversify";
import { Api, ApiResult } from "./api"
import { User, Place, Feature } from "../models"
import { profile } from "@nativescript/core";

@injectable()
export class MockApi implements Api {
    private mockImage(id) {
        return "https://picsum.photos/id/" + id + "/300";
    }
    
    @profile
    login(user: User): Promise<ApiResult<User>> {
        if (Math.random() < 0.1)
            return Promise.reject(new ApiResult(503, '{"message":"Server error"}'));
        return Promise.resolve(new ApiResult(200, new User("1", this.generateName())));
    }

    @profile
    loginFacebook(): Promise<ApiResult<User>> {
        return Promise.resolve(new ApiResult());
    }
    
    @profile
    register(user: User): Promise<ApiResult<User>> {
        let result = new ApiResult<User>();
        result.success = true;
        result.httpStatus = 200;
        result.object = user;
        return Promise.resolve(result);
    }
    
    @profile
    getFeatures(): Promise<ApiResult<Feature[]>> {
        let res = new ApiResult<Feature[]>(200, []);
        let features: Feature[] = [];
        for (let i = 0; i < 20; i++) {
            let feature = new Feature();
            feature.feature_id = Math.round(Math.random() * 100).toString();
            feature.image_url = this.mockImage(feature.feature_id);
            feature.name = this.generateName();
            features.push(feature);
        }
        res.object = features;
        return Promise.resolve(res);
    }
    
    @profile
    sendFeatures(user: User): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }

    @profile
    recommend(): Promise<ApiResult<Place[]>> {
        let res = new ApiResult<Place[]>(200, []);
        let places: Place[] = [];
        for (let i = 0; i < 8; i++) {
            let place = new Place();
            place.id = Math.round(Math.random() * 100).toString();
            place.imageUrl = this.mockImage(place.id);
            place.name = this.generateName();
            place.description = "description of " + place.name;
            places.push(place);
        }
        res.object = places;
        return Promise.resolve(res);
    }
    
    @profile
    wishListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    
    @profile
    wishListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    
    @profile
    visitedListAdd(user: User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    
    @profile
    visitedListDelete(user: User, place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    
    @profile
    placeDetail(place: Place): Promise<ApiResult<any>> {
        return Promise.resolve(new ApiResult());
    }
    
    @profile
    search(query: string): Promise<ApiResult<any>> {
        let res = new ApiResult<Place[]>(200, []);
        let places: Place[] = [];
        let r = Math.round(Math.random() * 10)
        for (let i = 0; i < r; i++) {
            let place = new Place();
            place.id = Math.round(Math.random() * 100).toString();
            place.imageUrl = this.mockImage(place.id);
            place.name = query;
            place.description = "description of " + place.name;
            places.push(place);
        }
        res.object = places;
        return Promise.resolve(res);
    }

    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private generateName() {
        var name1 = ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mexico City', 'Cairo', 'Mumbai', 'Beirut', 'Berlin', 'Beijing', 'Dhaka', 'Osaka', 'Moscow', 'New York City', 'Karachi', 'Buenos Aires', 'Istanbul', 'Kolkata', 'Manila', 'Sydney', 'Rio de Janeiro', 'Lagos', 'Los Angeles', 'Hawaii', 'Bangalore', 'Paris', 'Toulouse', 'Munich', 'Jakarta', 'Cologne', 'Dortmund', 'Bangkok', 'Seoul', 'Nagoya', 'London', 'Rome', 'Chicago', 'Ottawa', 'Lyon', 'Amsterdam', 'Hong Kong', 'Riyadh', 'Dubai', 'Santiago', 'Madrid', 'Barcelona', 'Houston', 'Dallas', 'Toronto', 'San Francisco', 'Miami', 'Singapore', 'Philadelphia', 'Atlanta', 'Alexandria', 'Bergen', 'Bruges', 'Bayreuth', 'Budapest', 'Cape Town', 'Cartagena', 'Chefchaouen', 'Casablanca', 'Chiang Mai', 'Copenhagen', 'Cusco', 'Doha', 'Dubrovnik', 'Edinburgh', 'Florence', 'Havana', 'Hanoi', 'Jaipur', 'Jerusalem', 'Kyoto', 'Ljubljana', 'Muscat', 'Porto', 'Prague', 'Quito', 'St Petersburg', 'Seville', 'Tallinn', 'Valletta', 'Monaco', 'Vienna', 'Venice', 'Zurich', 'Vancouver', 'Santa Fe', 'Essaouria', 'Sedona', 'Bordeaux', 'Charleston', 'Stuttgart', 'Hamburg', 'Lisbon', 'Santorini', 'Niagara Falls', 'Athens'];
        var name = name1[this.getRandomInt(0, name1.length + 1)];
        return name;
    }
}
