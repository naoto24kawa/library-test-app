export type Authentication = {
  id: number;
  token: string;
};

export type AuthSession = {
  user?: Authentication;
};

export type AuthCookie = {
  data?: AuthSession;
};
