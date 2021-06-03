import { Container } from "inversify";
import "reflect-metadata";

import { Http } from "@nativescript/core";
import { SecureStorage } from "@nativescript/secure-storage"
import { Sha } from "@plmservices/nativescript-sha";
import { log, profile } from "@nativescript/core/profiling";

export const sha = new Sha();
const inversify = new Container();
const storage = new SecureStorage()


export function named<T>(type: string, name?: string): T {
    // log("named called: " + type + "  name: " + name)
    return inversify.getNamed<T>(type, name ? name : type.toString().toLowerCase());
}

export function bind<T>(type: string, to: any, name?: string) {
    // log("bind called: " + type + " to: " + to + "  name: " + name)
    inversify.bind<T>(type).to(to).whenTargetNamed(name ? name : type.toString().toLowerCase());
}

export function toJson(val) {
    return JSON.stringify(val);
}

export function fromJson(val) {
    return JSON.parse(val);
}

export function getFacebookInfo(token: string) {
    return Http.getJSON(
        "https://graph.facebook.com/me?fields=id,name,email&access_token=" + token
    );
}
