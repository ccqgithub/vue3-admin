import { InjectionKey } from 'vue';

export const MenuInjectionKey = Symbol() as InjectionKey<{
  collapse: boolean;
}>;

export const MenuItemKey = Symbol() as InjectionKey<{
  depth: number;
}>;

export const SubMenuKey = Symbol() as InjectionKey<{
  toggle: () => {};
}>;
