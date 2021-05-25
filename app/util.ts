import { Http } from "@nativescript/core";
import { SecureStorage } from "nativescript-secure-storage"
const storage = new SecureStorage()

export async function getFacebookInfo(token) {
    return await Http.getJSON(
        "https://graph.facebook.com/me?fields=id,name,email&access_token=" + token
    );
}

export async function storePut(key, value) {
    return storage.set({ key: key, value: value });
}
export async function storeGet(key) {
    return storage.get({ key: key });
}
export function storeGetSync(key) {
    return storage.getSync({ key: key });
}
export async function storeDelete(key) {
    return storage.remove({ key: key });
}
export async function storeDeleteAll() {
    return storage.removeAll();
}

