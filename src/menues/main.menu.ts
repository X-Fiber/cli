import { injectable, inject, inquirer, table } from "~packages";
import { CliSymbols } from "~symbols";
import { AbstractMenu } from "./abstract.menu";

import type { IAbstractMenu, NMainMenu } from "~types";

@injectable()
export class MainMenu extends AbstractMenu implements IAbstractMenu {
  private readonly _choices: NMainMenu.Prompts = ["Login", "Help", "Exit"];

  constructor(
    @inject(CliSymbols.AuthMenu)
    private readonly _authMenu: IAbstractMenu
  ) {
    super();
  }

  public async menu(): Promise<void> {
    const { MAIN_MENU_COMMAND_LIST } = await inquirer.prompt<NMainMenu.Choices>(
      [
        {
          name: "MAIN_MENU_COMMAND_LIST",
          message: "Choose specific command 👋",
          type: "list",
          choices: this._choices,
        },
      ]
    );

    switch (MAIN_MENU_COMMAND_LIST) {
      case "Login":
        await this._authMenu.menu();
        this.separator;
        await this.menu();
        break;
      case "Help":
        this._help();
        this.separator;
        await this.menu();
        break;
      case "Exit":
        this._exit();
        this.separator;
        break;
    }
  }
}
