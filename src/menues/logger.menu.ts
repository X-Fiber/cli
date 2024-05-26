import { colors, inject, injectable, inquirer } from "~packages";
import { container } from "~container";
import { CliSymbols } from "~symbols";
import { AbstractMenu } from "./abstract.menu";

import type {
  IAuthMenu,
  IAbstractMenu,
  NLoggerMenu,
  IRequestService,
} from "~types";

@injectable()
export class LoggerMenu extends AbstractMenu implements IAbstractMenu {
  private readonly _choices: NLoggerMenu.Prompts = [
    "Set schema logger level",
    "Set schema logger transport",
    "Back to main menu",
  ];

  private readonly _logLevels: NLoggerMenu.LogLevel[] = [
    "1. error",
    "2. warn",
    "3. info",
    "4. schema",
    "5. debug",
  ];

  private readonly _logTransports: NLoggerMenu.LogTransport[] = [
    "console",
    "file",
  ];

  constructor(
    @inject(CliSymbols.RequestService)
    private readonly _requestService: IRequestService
  ) {
    super();
  }

  public async menu(): Promise<void> {
    const { LOGGER_MENU } = await inquirer.prompt<NLoggerMenu.Choices>([
      {
        name: "LOGGER_MENU",
        type: "list",
        message: "Choose specific logger command 👇",
        choices: this._choices,
      },
    ]);

    switch (LOGGER_MENU) {
      case "Set schema logger level":
        await this._setSchemeLevel();
        this.separator;
        await this.menu();
        break;
      case "Set schema logger transport":
        await this._setSchemeTransport();
        this.separator;
        await this.menu();
        break;
      case "Back to main menu":
        this.separator;
        await container.get<IAuthMenu>(CliSymbols.AuthMenu).privateMenu();
        break;
    }
  }

  private async _setSchemeLevel(): Promise<void> {
    const { LOGGER_MENU } = await inquirer.prompt<NLoggerMenu.Choices>([
      {
        name: "LOGGER_MENU",
        type: "list",
        message: "Choose log level for scheme logger ⚙️",
        choices: this._logLevels,
      },
    ]);

    console.log(colors.green(colors.bold("Log level change successful ✅")));
  }

  private async _setSchemeTransport(): Promise<void> {
    const { LOGGER_MENU } = await inquirer.prompt<NLoggerMenu.Choices>([
      {
        name: "LOGGER_MENU",
        type: "checkbox",
        message: "Enable next scheme logger transports 📗️",
        choices: this._logTransports,
      },
    ]);

    console.log(colors.green(colors.bold("Log transports enabled ✅")));
  }
}
