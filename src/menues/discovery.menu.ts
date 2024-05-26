import { injectable, inquirer } from "~packages";
import { AbstractMenu } from "./abstract.menu";

import type { IAbstractMenu, NDiscoveryMenu } from "~types";
import { container } from "~container";
import { CliSymbols } from "~symbols";

@injectable()
export class DiscoveryMenu extends AbstractMenu implements IAbstractMenu {
  private readonly _choices: NDiscoveryMenu.Prompts = [
    "Reload compute core configuration",
    "Reload business scheme configuration",
    "Back to main menu",
  ];

  public async publicMenu(): Promise<void> {
    const { DISCOVERY_MENU_COMMAND_LIST } =
      await inquirer.prompt<NDiscoveryMenu.Choices>([
        {
          name: "DISCOVERY_MENU_COMMAND_LIST",
          type: "list",
          choices: this._choices,
        },
      ]);

    switch (DISCOVERY_MENU_COMMAND_LIST) {
      case "Reload compute core configuration":
        await this._coreReConfig();
        this.separator;
        await this.publicMenu();
        break;
      case "Reload business scheme configuration":
        await this._schemeReConfig();
        this.separator;
        await this.publicMenu();
        break;
      case "Back to main menu":
        this.separator;
        await container.get<IAbstractMenu>(CliSymbols.MainMenu).publicMenu();
        break;
    }
  }

  private async _coreReConfig(): Promise<void> {}
  private async _schemeReConfig(): Promise<void> {}
}
