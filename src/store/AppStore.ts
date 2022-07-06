import { ref } from 'vue';
import { defineStore } from 'pinia';
import { InjectionContext } from 'pinia-di';

export const AppStore = ({ useStoreId }: InjectionContext) => {
  return defineStore(useStoreId('AppStore'), () => {
    const sideBarCollapsed = ref(true);
    const toggleSideBar = (collapsed = !sideBarCollapsed.value) => {
      sideBarCollapsed.value = collapsed;
    };

    return {
      sideBarCollapsed,
      toggleSideBar
    };
  });
};
