export const baseUrl = "/v1/call/cli";

export const urls = {
  auth: {
    login: "/auth/login",
  },
  discovery: {
    CORE_RE_CONFIG: "/discovery/core-re-config",
    SCHEME_RE_CONFIG: "/discovery/scheme-re-config",
  },
  logger: {
    SET_SCHEME_LEVEL: "/logger/set-scheme-level",
    SET_SCHEME_TRANSPORT: "logger/set-scheme-transport",
  },
};

export const MANAGER_AUTH_HEADER = "x-manager-authorization-secret";
export const MANAGER_USER_HEADER = "x-manager-user";
export const MANAGER_TOKEN_HEADER = "x-manager-access-token";
