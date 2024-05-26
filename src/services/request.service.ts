import { axios, injectable, si } from "~packages";
import {
  baseUrl,
  MANAGER_AUTH_HEADER,
  MANAGER_TOKEN_HEADER,
  MANAGER_USER_HEADER,
  urls,
} from "~common";

import { IRequestService, NRequestService, NAxios, NLoggerMenu } from "~types";

@injectable()
export class RequestService implements IRequestService {
  private _CONNECT: NRequestService.ConnectOptions | undefined;
  private _accessToken: string | undefined;

  public setConnectOptions(options: NRequestService.ConnectOptions): void {
    this._CONNECT = options;
  }

  private get _connect(): NRequestService.ConnectOptions {
    if (!this._CONNECT) {
      throw new Error("Connect options is undefined");
    }

    return this._CONNECT;
  }

  public async request<
    S extends NRequestService.Spaces,
    SR extends NRequestService.SpaceRoutes<S>,
    R = any
  >(space: S, routes: SR): Promise<R> {
    let response: NAxios.AxiosResponse;
    switch (space) {
      case "auth":
        try {
          await this._authRequest("login");
        } catch (e) {
          throw e;
        }
        break;
      case "discovery":
        break;
      case "logger":
        break;
    }

    return "" as R;
  }

  public isAccessToken(): boolean {
    return (
      typeof this._accessToken === "string" && this._accessToken.length > 0
    );
  }

  private async _authRequest(
    routes: NRequestService.AuthRoutes
  ): Promise<void> {
    switch (routes) {
      case "login":
        try {
          await this._request({
            endpoint: urls.auth.login,
            data: undefined,
          });
        } catch (e) {
          throw e;
        }

        break;
    }
  }

  public async login(
    options: NRequestService.RequestOptions<NRequestService.ConnectOptions>
  ): Promise<NRequestService.ConnectResult> {
    const { connect, secret, user } = this._connect;

    try {
      const response = await axios.request({
        url: `${connect.protocol}://${connect.host}:${connect.port}${baseUrl}${options.endpoint}`,
        method: "POST",
        headers: {
          [MANAGER_AUTH_HEADER]: secret,
          [MANAGER_USER_HEADER]: user,
        },
        data: {
          si: await this._getSI(),
          data: options.data,
        },
      });

      if (response.status === 200) {
        this._accessToken = response.headers[MANAGER_TOKEN_HEADER];
        return { status: "ok" };
      } else {
        return { status: "fail" };
      }
    } catch (e) {
      return { status: "error" };
    }
  }

  public setSchemaLevel(level: NLoggerMenu.LogLevel) {}

  private async _request<D = any, R = any>(
    options: NRequestService.RequestOptions<D>
  ): Promise<void> {
    const { connect, secret, user } = this._connect;

    const response = await axios.request<R>({
      url: `${connect.protocol}://${connect.host}:${connect.port}${baseUrl}${options.endpoint}`,
      method: "POST",
      headers: {
        [MANAGER_AUTH_HEADER]: secret,
        [MANAGER_USER_HEADER]: user,
      },
      data: {
        si: await this._getSI(),
        data: options.data,
      },
    });

    if (response.status === 200) {
      this._accessToken = response.headers[MANAGER_TOKEN_HEADER];
    } else {
      console.error(`Authentication failed. Unknown user or secret.`);
    }
  }

  private async _getSI(): Promise<NRequestService.SiDetails> {
    const system = await si.system();
    const bios = await si.bios();
    const osInfo = await si.osInfo();
    const networkInterfaces = await si.networkInterfaces();
    const macAddresses = Array.isArray(networkInterfaces)
      ? networkInterfaces
          .map((iface) => iface.mac)
          .filter((mac) => mac !== "00:00:00:00:00:00" && mac.length > 0)
      : [networkInterfaces.mac];

    return {
      manufacturer: system.manufacturer,
      model: system.model,
      uuid: system.uuid,
      biosVendor: bios.vendor,
      biosVersion: bios.version,
      biosReleaseDate: bios.releaseDate,
      osDistro: osInfo.distro,
      osRelease: osInfo.release,
      osCodename: osInfo.codename,
      osKernel: osInfo.kernel,
      osArch: osInfo.arch,
      macAddresses: macAddresses,
    };
  }
}
