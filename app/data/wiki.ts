import { Http, profile } from "@nativescript/core";
import { injectable } from "inversify";
import { bind } from "~/util";

//const WIKI_URL = https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&titles=
//const WIKI_URL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="
const WIKI_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/"

export default interface Wiki {
    text(title: string): Promise<string>;
    summary(title: string): Promise<string>;
}

@injectable()
class WikiImpl implements Wiki {

    @profile("wiki.text")
    async text(title: string): Promise<string> {
        const p = await Http.getJSON<any>(WIKI_URL + title);
        return p.extract_html;
    }

    @profile("wiki.summary")
    async summary(title: string): Promise<string> {
        const p = await Http.getJSON<any>(WIKI_URL + title);
        return p.extract_html;
    }
}

bind<Wiki>("Wiki", WikiImpl);
