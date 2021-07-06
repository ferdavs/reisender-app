import { Container } from "inversify";
import "reflect-metadata";

import { Http } from "@nativescript/core";
import { SecureStorage } from "@nativescript/secure-storage"
import { Sha } from "@plmservices/nativescript-sha";
import * as nsutils from 'tns-core-modules/utils/utils';
import { ios } from 'tns-core-modules/application';

export const sha = new Sha();
const inversify = new Container();
const storage = new SecureStorage()


export function inject<T>(type: string, name?: string): T {
    // log("named called: " + type + "  name: " + name)
    try {
        return name
            ? inversify.getNamed<T>(type, name)
            : inversify.get<T>(type);
    } catch (e) {
        console.error(e);
        return null;
    }
}

export function bind<T>(type: string, to: any, name?: string) {
    // log("bind called: " + type + " to: " + to + "  name: " + name)
    return name
        ? inversify.bind<T>(type).to(to).whenTargetNamed(name)
        : inversify.bind<T>(type).to(to).whenTargetIsDefault();
}

export function bindConstant<T>(type: string, to: any) {
    // log("bind called: " + type + " to: " + to + "  name: " + name)
    return inversify.bind<T>(type).toConstantValue(to);
}

export function inList(list, place){
    return list.filter((value) => value.id == place.id).length > 0;
}

export function toQuery(param: any): string {
    var str = "";
    for (var key in param) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(param[key]);
    }
    return str.length == 0 ? "" : "?" + str;
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

export const hideKeyboard = () => {
    if (ios) {
        ios.nativeApp.sendActionToFromForEvent('resignFirstResponder', null, null, null);
    } else {
        nsutils.ad.dismissSoftInput();
    }
};
