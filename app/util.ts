import { Http } from "@nativescript/core";

export async function getFacebookInfo(token) {
    return await Http.getJSON(
        "https://graph.facebook.com/me?fields=id,name,email&access_token=" + token
    );
}