const reactEnv = (key: string) => process.env[`REACT_APP_${key}`];

export const SELF_HOSTED =
  window.env.has('API_URL') &&
  window.env.get('API_URL') !== reactEnv('API_URL');

export const API_URL = SELF_HOSTED
  ? (window.env.get('API_URL') as string)
  : (reactEnv('API_URL') as string);

export const TOKEN_HEADER = reactEnv('TOKEN_HEADER') as string;

export const TOKEN_EXPIRED_VALUE = reactEnv('TOKEN_EXPIRED_VALUE') as string;
