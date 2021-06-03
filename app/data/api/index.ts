import { Container } from "inversify";
import "reflect-metadata";

import { ApiImpl } from "./apiImpl";
import { Repo } from "./repo"
import { MockApi } from "./mockApi";
import { Api } from "./api";

const container = new Container();
container.bind("Api").to(ApiImpl).whenTargetNamed('impl');
container.bind("Api").to(Repo).whenTargetNamed('repo');
container.bind("Api").to(MockApi).whenTargetNamed('mock');

export function namedApi(name: string): Api {
    return container.getNamed("Api", name);
}
