// Strapi style
import { TAuthResponse, TUser } from 'libs/core/api';

export type TLoginForm = {
  identifier: string;
  password: string;
};

export type LoginResponse = TAuthResponse<TUser>;

/*
STRAPI v4.6.0
/api/auth/local
{
  identifier: 'email@mail.com'
  password: 'password';
}
{
  jwt: string;
  user: {
    id: number;
    username: string | null;
    email: string | null;
    provider: string;      // "local",
    confirmed: boolean;    // true,
    blocked: boolean;      // false,
    createdAt: string;     // "2023-01-23T19:39:16.248Z",
    updatedAt: string;     // "2023-01-31T11:02:53.732Z",
    phone: string | null;  // null,
    vkUrl: string | null;  // null,
    telegramName: string | null; // null
  };
};
*/
