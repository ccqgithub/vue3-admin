import 'vue-router';
import { TransitionType } from '@/types';

declare module 'vue-router' {
  interface RouteMeta {
    transitionType: TransitionType;
  }
}
