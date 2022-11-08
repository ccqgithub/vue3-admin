export * from './user';
export * from './space';
export * from './utils';

export type PageStruct<T> = {
  content: T[];
  totalElements: number;
};

export type TransitionType = 'FORWARD' | 'BACK' | 'REPLACE';
