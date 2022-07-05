import { InjectionKey, Ref } from 'vue';

export const MenuKey = Symbol() as InjectionKey<{
  collapsed: Ref<boolean>;
  folded: Ref<boolean>;
  depth: Ref<number>;
  popup: Ref<boolean>;
  toggle: (fold?: boolean) => void;
  toggleSub: (show: boolean) => void;
  enterTitle: () => void;
  leaveTitle: () => void;
}>;
