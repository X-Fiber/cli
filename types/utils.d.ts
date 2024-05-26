export type KeyObjectMapper<
  N extends string,
  T extends Record<string, string>
> = {
  [key in N]: T[keyof T];
};
