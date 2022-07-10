import { User } from '@/types';
import { getGlobalStore } from '@/store';

export const normalizeUser = (): User => {
  const user: User = {
    id: '1',
    email: 'test@qq.com',
    phone: '1245566',
    photo:
      'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g2/M00/08/0B/ChMlWV5MgmSIPx9oAAeUA7jjXq4AANYRgPSOdUAB5Qb358.jpg',
    token: '454djfskdjls;jg'
  };
  return user;
};

export const loginByEmail = async (args: {
  email: string;
  password: string;
}) => {
  // api login
  return normalizeUser();
};

export const loginByPhone = async (args: {
  phone: string;
  password: string;
}) => {
  // api login
  return normalizeUser();
};

export const getCurrentUser = async () => {
  const globalStore = getGlobalStore()!;
  if (!globalStore.token) return null;
  // api get user
  return normalizeUser();
};

export const logout = async () => {
  const globalStore = getGlobalStore()!;
  if (!globalStore.token) return null;
  // api logout
  return Promise.resolve();
};
