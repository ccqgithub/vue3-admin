import { ref } from 'vue';
import { defineStore } from 'pinia';
import { InjectionContext } from 'pinia-di';

export const AppStore = ({ useStoreId }: InjectionContext) => {
  return defineStore(useStoreId('AppStore'), () => {
    const sideBarCollapsed = ref(false);
    const toggleSideBar = () => {
      sideBarCollapsed.value = !sideBarCollapsed.value;
    };

    return {
      sideBarCollapsed,
      toggleSideBar
    };
  });
};
