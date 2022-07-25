export type IToken = {
  expiredIn: number;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string | null;
  phone: string | null;
  photo: string | null;
};
