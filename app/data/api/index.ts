import { ApiImpl } from "./apiImpl";
import { Repo } from "./repo"
import { MockApi } from "./mockApi";
import { bind, bindConstant } from "~/util";
import { Api } from "./api";

bindConstant<string>("ApiUrl", 'https://vscode.anor.gq');
bind<Api>("Api", ApiImpl, "impl");
bind<Api>("Api", MockApi, "mock");
bind<Api>("Api", Repo); //default

export default Api
