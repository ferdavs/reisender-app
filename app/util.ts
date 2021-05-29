import { Http } from "@nativescript/core";
import { SecureStorage } from "nativescript-secure-storage"
import { Sha } from "@plmservices/nativescript-sha";

export const sha = new Sha();
const storage = new SecureStorage()

export async function getFacebookInfo(token: string) {
    return await Http.getJSON(
        "https://graph.facebook.com/me?fields=id,name,email&access_token=" + token
    );
}
export function isNull(val: any) {
    return val === null || val === undefined;
}
export async function storePut(key: string, value: string) {
    return storage.set({ key: key, value: value });
}
export async function storeGet(key: string) {
    return storage.get({ key: key });
}
export function storeGetSync(key: string, def?: any) {
    let val = storage.getSync({ key: key });
    return isNull(val) ? def : val;
}
export async function storeDelete(key: string) {
    return storage.remove({ key: key });
}
export async function storeDeleteAll() {
    return storage.removeAll();
}
