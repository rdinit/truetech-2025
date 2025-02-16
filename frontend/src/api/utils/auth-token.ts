const TOKEN_KEY = "authToken";

let token: string | null = null;

export const authToken = {
  get: (): string | null => token ??= localStorage[TOKEN_KEY],
  set: (newToken: string) => {
    localStorage[TOKEN_KEY] = newToken;
    token = newToken;
  },
  remove: () => {
    localStorage[TOKEN_KEY] = null;
    token = null;
  },
};
