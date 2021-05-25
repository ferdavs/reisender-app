import { Container } from "inversify";
import "reflect-metadata";

import { ApiImpl } from "./apiImpl";
import { RealApi } from "./realApi";
import { MockApi } from "./mockApi";
import { Api } from "./api";

let container = new Container();
container.bind<Api>("Api").to(ApiImpl).whenTargetNamed('impl');
container.bind<Api>("Api").to(RealApi).whenTargetNamed('real');
container.bind<Api>("Api").to(MockApi).whenTargetNamed('mock');

export {container, Api}
