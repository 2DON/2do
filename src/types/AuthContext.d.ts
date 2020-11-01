interface AuthContext {
  authorized: boolean;
  setToken(newToken: string): void;
}
