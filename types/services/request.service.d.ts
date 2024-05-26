export interface IRequestService {
  isAccessToken(): boolean;
  setConnectOptions(options: NRequestService.ConnectOptions): void;
  login(
    options: NRequestService.RequestOptions<NRequestService.ConnectOptions>
  ): Promise<NRequestService.ConnectResult>;
  request<
    S extends NRequestService.Spaces,
    SR extends NRequestService.SpaceRoutes<S>,
    R = any
  >(
    space: S,
    routes: SR
  ): Promise<R>;
}

export namespace NRequestService {
  export type Spaces = "auth" | "discovery" | "logger";
  export type AuthRoutes = "login";
  export type DiscoveryRoutes = "core:re:config" | "schema:re:config";
  export type LoggerRoutes = "set:logger:level" | "set:logger:transport";

  export type SpaceRoutes<T extends Spaces> = T extends "auth"
    ? AuthRoutes
    : T extends "discovery"
    ? DiscoveryRoutes
    : T extends "logger"
    ? LoggerRoutes
    : never;

  export type RequestOptions<D = any> = {
    endpoint: string;
    data: D;
  };

  export type ConnectOptions = {
    connect: {
      protocol: string;
      host: string;
      port: number;
    };
    user: string;
    secret: string;
  };

  export type ConnectResult = { status: "ok" | "fail" | "error" };

  export type SiDetails = {
    manufacturer: string;
    model: string;
    uuid: string;
    biosVendor: string;
    biosVersion: string;
    biosReleaseDate: string;
    osDistro: string;
    osRelease: string;
    osCodename: string;
    osKernel: string;
    osArch: string;
    macAddresses: string[];
  };
}
