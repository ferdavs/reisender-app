import { Http, profile } from "@nativescript/core";
import { injectable } from "inversify";
import { bind } from "~/util";

//https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&titles=
const WIKI_URL = "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles="

export default interface Wiki {
    text(title: string);

}

@injectable()
class WikiImpl implements Wiki {

    @profile("wiki.text")
    text(title: string): Promise<string> {
        return Http.getJSON(WIKI_URL + title);
    }
}

bind<Wiki>("Wiki", WikiImpl)
