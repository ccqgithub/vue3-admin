import { post, get, put, del, patch } from '@/service';
import { trimParams } from '@/utils';
import {
  LocationItem,
  LocationDetail,
  LocationForm,
  PageStruct
} from '@/types';

const mocks: LocationItem[] = [];
let mockId = 0;

export const locationCreate = async (args: Partial<LocationForm>) => {
  const id = `${++mockId}`;
  const item: LocationDetail = {
    id,
    ...(args as any)
  };
  mocks.push(item);
  return item;

  // const res = await post<LocationDetail>({
  //   url: '/admin/v1/locations',
  //   data: trimParams(args)
  // });
  // return res.data;
};

export const locationUpdate = async (args: Partial<LocationForm>) => {
  const { id, ...rest } = args;
  const index = mocks.findIndex((v) => v.id === id);
  mocks[index] = {
    ...mocks[index],
    ...(rest as any),
    id: id!
  };
  return mocks[index];

  // const res = await put({
  //   url: `/admin/v1/locations/${id}`,
  //   data: trimParams(rest)
  // });
  // return res.data;
};

export const locationPatch = async (args: Partial<LocationForm>) => {
  const { id, ...rest } = args;
  const index = mocks.findIndex((v) => v.id === id);
  mocks[index] = {
    ...mocks[index],
    ...(rest as any),
    id: id!
  };
  return mocks[index];

  // const res = await patch({
  //   url: `/admin/v1/locations/${id}`,
  //   data: trimParams(rest)
  // });
  // return res.data;
};

export const locationDelete = async (id: string) => {
  const index = mocks.findIndex((v) => v.id === id);
  mocks.splice(index, 1);

  // const res = await del({
  //   url: `/admin/v1/locations/${id}`
  // });
  // return res.data;
};

export const locationList = async (args: {
  page: number;
  size: number;
  keyword?: string;
  status?: string;
}) => {
  return {
    items: mocks,
    total: 100
  };

  // const res = await get<PageStruct<LocationItem>>({
  //   url: '/admin/v1/locations',
  //   data: trimParams({
  //     ...args,
  //     page: args.page - 1
  //   })
  // });
  // return {
  //   items: res.data.content,
  //   total: res.data.totalElements
  // };
};

export const locationDetail = async (id: string) => {
  const index = mocks.findIndex((v) => v.id === id);
  return mocks[index]!;

  // const res = await get<LocationDetail>({
  //   url: `/admin/v1/locations/${id}`
  // });
  // return res.data;
};
