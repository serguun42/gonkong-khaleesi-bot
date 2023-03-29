export type ConfigName = 'tokens' | 'urls';

export type TokensConfig = {
  BOT_USER_ID: number;
  CSRF: string;
  X_USER: string;
};

export type UrlsConfig = {
  BASE_URL: string;
  API_VERSION: string;
};

export type GenericConfig<T extends ConfigName> = T extends 'tokens'
  ? TokensConfig
  : T extends 'urls'
  ? UrlsConfig
  : never;
