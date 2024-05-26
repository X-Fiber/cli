import { injectable, inject, inquirer, colors } from "~packages";
import { CliSymbols } from "~symbols";
import { urls } from "~common";
import { AbstractMenu } from "./abstract.menu";

import type { IAbstractMenu, IRequestService, NAuthMenu } from "~types";
import { container } from "~container";

@injectable()
export class AuthMenu extends AbstractMenu implements IAbstractMenu {
  private readonly _choices: NAuthMenu.Prompts = [
    "Logger namespace (change logging options)",
    "Discovery namespace (reload configurations)",
    "Login",
    "Help",
    "Exit",
  ];

  constructor(
    @inject(CliSymbols.RequestService)
    private readonly _requestService: IRequestService,
    @inject(CliSymbols.DiscoveryMenu)
    private readonly _discoveryMenu: IAbstractMenu,
    @inject(CliSymbols.LoggerMenu)
    private readonly _loggerMenu: IAbstractMenu
  ) {
    super();
  }

  public async menu(): Promise<void> {
    try {
      const { status } = await this._loginForm();
      switch (status) {
        case "ok":
          this.separator;
          await this.privateMenu();
          break;
        case "fail":
          this.separator;
          await this.menu();
          break;
        case "error":
          this.separator;
          await this.menu();
          break;
      }
    } catch (e) {
      console.error("Compute core is unavailable");
    }
  }

  public async privateMenu(): Promise<void> {
    const { PRIVATE_AUTH_MENU } = await inquirer.prompt<NAuthMenu.Choices>({
      name: "PRIVATE_AUTH_MENU",
      type: "list",
      message: "Choose specific namespace with commands 👇",
      choices: this._choices,
    });

    switch (PRIVATE_AUTH_MENU) {
      case "Logger namespace (change logging options)":
        await this._loggerMenu.menu();
        this.separator;
        await this.privateMenu();
        break;
      case "Discovery namespace (reload configurations)":
        await this._discoveryMenu.menu();
        this.separator;
        await this.privateMenu();
        break;
      case "Login":
        try {
          await this.menu();
        } catch {
          console.error("Compute core is unavailable");
        }
        break;
      case "Help":
        this._help();
        this.separator;
        await this.privateMenu();
        break;
      case "Exit":
        this._exit();
        this.separator;
        break;
    }
  }

  private async _loginForm(): Promise<{ status: "ok" | "fail" | "error" }> {
    const { LOGIN_CREDENTIALS } = await inquirer.prompt({
      name: "LOGIN_CREDENTIALS",
      type: "input",
      message: "Input your connect options with authentication credentials.",
      default: "http 0.0.0.0 11008 Admin x-fiber-secret",
    });

    const chunks: string[] = LOGIN_CREDENTIALS.split(" ");

    if (chunks.length !== 5) {
      console.log(
        colors.red(
          `Credentials raw invalid. Raw must be contain protocol, host, port, username and secret. For example 'http 0.0.0.0 11008 Admin x-fiber-secret'`
        )
      );
      return { status: "fail" };
    }

    const [protocol, host, port, username, secret] = chunks;

    if (protocol !== "http" && protocol !== "https") {
      console.log(
        colors.red(
          colors.bold(`Protocol invalid. Supported 'http' or 'https' variants.`)
        )
      );
      return { status: "fail" };
    }

    const data = {
      secret: secret,
      user: username,
      connect: { protocol, host, port: Number(port) },
    };

    this._requestService.setConnectOptions(data);
    try {
      const { status } = await this._requestService.login({
        endpoint: urls.auth.login,
        data,
      });

      switch (status) {
        case "ok":
          console.log(
            colors.green(colors.bold("Successful connect to compute core 👍"))
          );
          break;
        case "fail":
          console.log(
            colors.red(
              colors.bold(
                "Compute core for this connection options is not available 🚫"
              )
            )
          );
          break;
      }

      return { status };
    } catch (e) {
      console.log(
        colors.red(
          colors.bold(
            "Compute core for this connection options is not available 🚫"
          )
        )
      );
      return { status: "error" };
    }
  }
}
