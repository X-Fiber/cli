import { KeyObjectMapper } from "./utils";

export interface IAbstractMenu {
  menu(): Promise<void>;
}

export interface IAuthMenu extends IAbstractMenu {
  privateMenu(): Promise<void>;
}

export namespace NAuthMenu {
  export type Commands = {
    LOGGER: "Logger namespace (change logging options)";
    DISCOVERY: "Discovery namespace (reload configurations)";
    LOGIN: "Login";
    HELP: "Help";
    EXIT: "Exit";
  };

  export type Prompts = Array<Commands[keyof Commands]>;
  export type Choices = KeyObjectMapper<"PRIVATE_AUTH_MENU", Commands>;
}

export namespace NMainMenu {
  export type Commands = {
    LOGIN: "Login";
    HELP: "Help";
    EXIT: "Exit";
  };

  export type Prompts = Array<Commands[keyof Commands]>;
  export type Choices = KeyObjectMapper<"MAIN_MENU_COMMAND_LIST", Commands>;
}

export namespace NDiscoveryMenu {
  export type Commands = {
    CORE_RE_CONFIG: "Reload compute core configuration";
    SCHEME_RE_CONFIG: "Reload business scheme configuration";
    MAIN_MENU: "Back to main menu";
  };

  export type Prompts = Array<Commands[keyof Commands]>;
  export type Choices = KeyObjectMapper<
    "DISCOVERY_MENU_COMMAND_LIST",
    Commands
  >;
}

export namespace NLoggerMenu {
  export type LogLevel =
    | "1. error"
    | "2. warn"
    | "3. info"
    | "4. schema"
    | "5. debug";

  export type LogTransport = "console" | "file";

  export type Commands = {
    SET_SCHEME_LEVEL: "Set schema logger level";
    SET_SCHEME_TRANSPORT: "Set schema logger transport";
    MAIN_MENU: "Back to main menu";
  };

  export type Prompts = Array<Commands[keyof Commands]>;
  export type Choices = KeyObjectMapper<"LOGGER_MENU", Commands>;
}
