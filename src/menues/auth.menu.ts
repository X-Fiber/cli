import { injectable, inject, inquirer, colors } from "~packages";
import { CliSymbols } from "~symbols";
import { AbstractMenu } from "./abstract.menu";

import type { IAbstractMenu, IRequestService, NAuthMenu } from "~types";
import * as url from "node:url";
import { urls } from "~common";

@injectable()
export class AuthMenu extends AbstractMenu implements IAbstractMenu {
  private readonly _choices: NAuthMenu.Prompts = ["Login"];

  constructor(
    @inject(CliSymbols.RequestService)
    private readonly _requestService: IRequestService
  ) {
    super();
  }

  public async publicMenu(): Promise<void> {
    try {
      const auth = await this._loginForm();
      console.log(auth);
      auth ? await this._privateMenu() : await this.publicMenu();
    } catch (e) {
      console.log(e);
      console.error("Compute core is unavailable");
    }
  }

  private async _privateMenu(): Promise<void> {}

  private async _loginForm(): Promise<boolean> {
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
      this.separator;
    }

    const [protocol, host, port, username, secret] = chunks;

    if (protocol !== "http" && protocol !== "https") {
      console.log(
        colors.red(
          colors.bold(`Protocol invalid. Supported 'http' or 'https' variants.`)
        )
      );
      this.separator;
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

      return status === "ok";
    } catch (e) {
      return false;
    }
  }
}
