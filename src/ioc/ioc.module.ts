import { inversify } from "~packages";
import { CliSymbols } from "~symbols";
import { DiscoveryMenu, LoggerMenu, MainMenu, AuthMenu } from "../menues";
import { Initiator } from "../initiator";
import { RequestService } from "../services";

import type { IAbstractMenu, IInitiator, IRequestService } from "~types";

export const CliModule = new inversify.ContainerModule((bind) => {
  // Providers
  bind<IRequestService>(CliSymbols.RequestService)
    .to(RequestService)
    .inTransientScope();

  // menus
  bind<IAbstractMenu>(CliSymbols.AuthMenu).to(AuthMenu).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.MainMenu).to(MainMenu).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.LoggerMenu).to(LoggerMenu).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.DiscoveryMenu)
    .to(DiscoveryMenu)
    .inSingletonScope();

  // initiator
  bind<IInitiator>(CliSymbols.Initiator).to(Initiator).inSingletonScope();
});
