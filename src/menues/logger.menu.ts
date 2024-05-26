import { injectable, inquirer } from "~packages";
import { AbstractMenu } from "./abstract.menu";

import type { IAbstractMenu, NLoggerMenu } from "~types";
import { container } from "~container";
import { CliSymbols } from "~symbols";

@injectable()
export class LoggerMenu extends AbstractMenu implements IAbstractMenu {
  private readonly _choices: NLoggerMenu.Prompts = [
    "Set schema logger level",
    "Set schema logger transport",
    "Back to main menu",
  ];

  public async publicMenu(): Promise<void> {
    const { LOGGER_MENU_COMMAND_LIST } =
      await inquirer.prompt<NLoggerMenu.Choices>([
        {
          name: "LOGGER_MENU_COMMAND_LIST",
          type: "list",
          choices: this._choices,
        },
      ]);

    switch (LOGGER_MENU_COMMAND_LIST) {
      case "Set schema logger level":
        await this._setSchemeLevel();
        this.separator;
        await this.publicMenu();
        break;
      case "Set schema logger transport":
        await this._setSchemeTransport();
        this.separator;
        await this.publicMenu();
        break;
      case "Back to main menu":
        this.separator;
        await container.get<IAbstractMenu>(CliSymbols.MainMenu).publicMenu();
        break;
    }
  }

  private async _setSchemeLevel(): Promise<void> {}
  private async _setSchemeTransport(): Promise<void> {}
}
