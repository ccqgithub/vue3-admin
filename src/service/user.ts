import { User } from '@/types';

export const loginByEmail = async (args: {
  email: string;
  password: string;
}) => {
  return Promise.resolve({
    expiredIn: 72000,
    accessToken: 'string',
    refreshToken: 'string'
  });
};

export const loginByUsername = async (args: {
  username: string;
  password: string;
}) => {
  return Promise.resolve({
    expiredIn: 72000,
    accessToken: 'string',
    refreshToken: 'string'
  });
};

export const getUserInfo = async () => {
  const user: User = {
    id: '1',
    email: 'ee@qq.com',
    phone: '',
    photo:
      'https://tse1-mm.cn.bing.net/th/id/OET.179f060ab2a4491fbbdadf9398203748?w=272&h=272&c=7&rs=1&o=5&dpr=2&pid=1.9'
  };
  return user;
};

export const logout = async () => {};
