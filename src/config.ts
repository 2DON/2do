function reactEnv(key: string) {
  return process.env[`REACT_APP_${key}`];
}

export const API_URL = reactEnv('API_URL') as string;
export const TOKEN_HEADER = reactEnv('TOKEN_HEADER') as string;
export const TOKEN_EXPIRED_VALUE = reactEnv('TOKEN_HEADER') as string;
