import "reflect-metadata";
import { inversify } from "~packages";
import { CliModule } from "./ioc.module";

const container = new inversify.Container();
container.load(CliModule);
export { container };
