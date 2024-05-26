import { container } from "~container";
import { CliSymbols } from "~symbols";
import type { IInitiator } from "~types";

const initiator = container.get<IInitiator>(CliSymbols.Initiator);

const start = async () => {
  await initiator.start();
};

const stop = (code: 0 | 1) => {
  initiator
    .stop()
    .then(() => {
      process.removeAllListeners();
      process.exit(code);
    })
    .catch((e) => {
      console.error(e);
      process.removeAllListeners();
      process.exit(1);
    });
};

process.on("SIGTERM", () => stop(0));
process.on("SIGINT", () => stop(0));
process.on("SIGHUP", () => stop(0));
process.on("uncaughtException", () => stop(1));
process.on("unhandledRejection", () => stop(1));

start()
  .then()
  .catch(() => stop(1));
