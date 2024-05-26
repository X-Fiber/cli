import { injectable, inject } from "~packages";
import { CliSymbols } from "~symbols";
import { logBanner } from "~utils";

import type { IAbstractMenu, IInitiator } from "~types";

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CliSymbols.MainMenu)
    private readonly mainMenu: IAbstractMenu
  ) {}

  public async start(): Promise<void> {
    logBanner();
    await this.mainMenu.menu();
  }

  public async stop(): Promise<void> {}
}
