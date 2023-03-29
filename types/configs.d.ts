export type ConfigName = 'tokens' | 'urls';

export type TokensConfig = {
  user_id: number;
  xsrf_token_cookie: string;
  x_user_cookie: string;
  session_cookie: string;
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
