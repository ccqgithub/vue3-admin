import 'vue-router';
import {
  RouteLocationNormalizedLoaded,
  RouteLocationMatched
} from 'vue-router';
import { TransitionType } from '@/types';

type Breadcrumb = {
  title:
    | string
    | ((v: {
        id?: string;
        name?: string;
        route?: RouteLocationNormalizedLoaded;
        matched?: RouteLocationMatched;
      }) => string);
  path?: (v: string) => string;
};

declare module 'vue-router' {
  interface RouteMeta {
    transitionType?: TransitionType;
    breadcrumb?: Breadcrumb[];
  }
}
