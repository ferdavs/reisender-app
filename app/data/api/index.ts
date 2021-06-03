import { ApiImpl } from "./apiImpl";
import { Repo } from "./repo"
import { MockApi } from "./mockApi";
import { bind } from "~/util";
import { Api } from "./api";

bind<Api>("Api", ApiImpl, "impl");
bind<Api>("Api", MockApi, "mock");
bind<Api>("Api", Repo, "repo");

export { Api }
