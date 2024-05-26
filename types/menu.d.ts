import { KeyObjectMapper } from "./utils";

export interface IAbstractMenu {
  publicMenu(): Promise<void>;
}

export namespace NAuthMenu {
  export type Commands = {
    LOGIN: "Login";
  };

  export type Prompts = Array<Commands[keyof Commands]>;
  export type Choices = KeyObjectMapper<"PUBLIC_AUTH_MENU", Commands>;
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
  export type Commands = {
    SET_SCHEME_LEVEL: "Set schema logger level";
    SET_SCHEME_TRANSPORT: "Set schema logger transport";
    MAIN_MENU: "Back to main menu";
  };

  export type Prompts = Array<Commands[keyof Commands]>;
  export type Choices = KeyObjectMapper<"LOGGER_MENU_COMMAND_LIST", Commands>;
}
