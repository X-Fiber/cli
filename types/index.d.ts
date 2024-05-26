export type * from "./menu";
export type * from "./utils";
export type * from "./services";
export type * from "./packages";

export interface IInitiator {
  start(): Promise<void>;
  stop(): Promise<void>;
}
