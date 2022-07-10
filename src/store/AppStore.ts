import { ref } from 'vue';
import { defineStore } from 'pinia';
import { InjectionContext } from 'pinia-di';
import { User } from '@/types';
import { TOKEN_NAME } from '@/constant';

export const AppStore = ({ useStoreId }: InjectionContext) => {
  const initToken = localStorage.getItem(TOKEN_NAME) || null;

  return defineStore(useStoreId('AppStore'), () => {
    const token = ref<string | null>(initToken);
    const user = ref<User | null>(null);
    const isLogin = () => !!token.value;
    const login = (args: { token: string; user: User }) => {
      token.value = args.token;
      user.value = args.user;
      localStorage.setItem(TOKEN_NAME, args.token);
    };
    const logout = () => {
      token.value = null;
      user.value = null;
      localStorage.removeItem(TOKEN_NAME);
    };
    const setUser = (v: User) => {
      user.value = v;
    };

    const sideBarCollapsed = ref(true);
    const toggleSideBar = (collapsed = !sideBarCollapsed.value) => {
      sideBarCollapsed.value = collapsed;
    };

    return {
      token,
      isLogin,
      user,
      login,
      logout,
      setUser,

      sideBarCollapsed,
      toggleSideBar
    };
  });
};
