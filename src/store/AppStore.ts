import { ref, Ref, markRaw, reactive } from 'vue';
import { defineStore } from 'pinia';
import { InjectionContext } from 'pinia-di';
import { ConfirmModalProps } from '@/components';
import { User, IToken } from '@/types';
import { randomKey } from '@/utils';
import { TOKEN_NAME } from '@/constant';

type ConfirmProps = Omit<ConfirmModalProps, 'visible'>;

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

    // header
    const headerRef = ref<HTMLDivElement | null>(null);
    const setHeaderRef = (el: HTMLDivElement | null) => {
      headerRef.value = el;
    };

    // layout
    const layout = reactive({
      mainHeight: 0,
      mainPageHeight: 0,
      mainHeaderHeight: 0
    });
    const setLayout = (
      v: Partial<{
        mainHeight: number;
        mainPageHeight: number;
        mainHeaderHeight: number;
      }>
    ) => {
      layout.mainHeight = v.mainHeight || layout.mainHeight;
      layout.mainPageHeight = v.mainPageHeight || layout.mainPageHeight;
      layout.mainHeaderHeight = v.mainHeaderHeight || layout.mainHeaderHeight;
    };

    const sideBarCollapsed = ref(true);
    const toggleSideBar = (collapsed = !sideBarCollapsed.value) => {
      sideBarCollapsed.value = collapsed;
    };

    // confirmModals
    const confirmModals = ref<
      Map<
        string,
        {
          props: ConfirmProps;
          cancel: () => void;
          ok: () => void;
          unmount: () => void;
          visibleRef: Ref<boolean>;
        }
      >
    >(new Map());
    // confirm modal
    const confirm = (props: ConfirmProps) => {
      const key = randomKey('confirmModal');
      const visibleRef = ref(true);
      return new Promise<boolean>((resolve) => {
        confirmModals.value.set(
          key,
          markRaw({
            props: {
              ...props
            },
            visibleRef,
            cancel: () => resolve(false),
            ok: () => resolve(true),
            unmount: () => {
              confirmModals.value.delete(key);
            }
          })
        );
      });
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
      toggleSideBar,

      confirmModals,
      confirm,

      headerRef,
      setHeaderRef,

      layout,
      setLayout
    };
  });
};
