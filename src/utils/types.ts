import { ExtractPropTypes, ExtractDefaultPropTypes } from 'vue';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K> = Omit<T, K> & Partial<T>;
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type TypeFromProps<T extends Record<string, any>> = Writeable<
  PartialBy<ExtractPropTypes<T>, keyof ExtractDefaultPropTypes<T>>
>;
