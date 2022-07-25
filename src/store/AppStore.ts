import { ref } from 'vue';
import { defineStore } from 'pinia';
import { InjectionContext } from 'pinia-di';
import { User, IToken } from '@/types';
import { TOKEN_NAME } from '@/constant';

export const AppStore = ({ useStoreId }: InjectionContext) => {
  let initToken: IToken | null = null;
  try {
    const storeToken = localStorage.getItem(TOKEN_NAME) || null;
    if (storeToken) {
      initToken = JSON.parse(storeToken);
    }
  } catch (e) {}

  return defineStore(useStoreId('AppStore'), () => {
    const token = ref<IToken | null>(initToken);
    const user = ref<User | null>(null);
    const isLogin = () => !!token.value;
    const setToken = (t: IToken) => {
      token.value = t;
      if (t.accessToken) {
        localStorage.setItem(TOKEN_NAME, JSON.stringify(t));
      }
    };
    const clearLogin = () => {
      token.value = null;
      user.value = null;
      localStorage.removeItem(TOKEN_NAME);
    };
    const getToken = () => token.value;
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
      setToken,
      getToken,
      setUser,
      clearLogin,

      sideBarCollapsed,
      toggleSideBar
    };
  });
};
