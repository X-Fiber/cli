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

  public async publicMenu(): Promise<void> {
    const { MAIN_MENU_COMMAND_LIST } = await inquirer.prompt<NMainMenu.Choices>(
      [
        {
          name: "MAIN_MENU_COMMAND_LIST",
          message: "Choose specific menu or get help",
          type: "list",
          choices: this._choices,
        },
      ]
    );

    switch (MAIN_MENU_COMMAND_LIST) {
      case "Login":
        await this._authMenu.publicMenu();
        this.separator;
        await this.publicMenu();
        break;
      case "Help":
        this._help();
        this.separator;
        await this.publicMenu();
        break;
      case "Exit":
        this._exit();
        this.separator;
        break;
    }
  }

  private _help() {
    const data = [
      ["Commands", "Args", "Details"],
      ["Auth", "", ""],
      [
        "Login",
        "1. protocol \n2. host \n3. port \n4. secret",
        "Authorization command in compute core scheme. For successful authorization need write connect parameters. For example 'http localhost 11001 x-fiber-secret'",
      ],
      ["Logger", "", ""],
      [
        "Set log level",
        "1. log level",
        "Change logger level. With each increase in the logging level, all records at the set level and all records at levels below will be recorded. Supported next log level for SchemaLogger - 1. Error. 2. Warn. 3. Info. 4. Schema 5. Debug",
      ],
      [
        "Set log transport",
        "1. transport type",
        "Change supported logger transport. Compute core is supported next transports: 'console' | 'file'. In the future X-Fiber implement ELK Stack.",
      ],
      ["Discovery", "", ""],
      [
        "Core reload config",
        " - ",
        "Reload compute core configuration. Core configuration variables describe in specific scope. Look configuration details in \nhttps://www.x-fiber.org/docs/getting-started/server/compute-core-config",
      ],
      [
        "Scheme reload config",
        " - ",
        "Reload scheme configuration. Scheme configuration variables must be start with 'apps__'",
      ],
    ];

    console.log(
      table(data, {
        columns: [
          { alignment: "center", verticalAlignment: "middle" },
          { alignment: "center", width: 20, verticalAlignment: "middle" },
          { alignment: "left", width: 100, verticalAlignment: "middle" },
        ],
        spanningCells: [
          { col: 0, row: 1, colSpan: 3, verticalAlignment: "middle" },
          { col: 0, row: 3, colSpan: 3 },
          { col: 0, row: 6, colSpan: 3 },
        ],
      })
    );
  }

  private _exit() {
    process.exit(0);
  }
}
