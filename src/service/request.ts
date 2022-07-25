import { joinUrl, GeneralError, normalizeError } from '@/utils';
import { apiBaseUrl } from '@/config';
import { getGlobalStore } from '@/store';
import { i18n } from '@/i18n';
import { IToken } from '@/types';

// 是否有 refresh token 逻辑
const USE_REFRESH_TOKEN = false;
export const ServerErrMsg = '抱歉，服务器出错。请稍后再试。';
const checkIsRefreshToken = (url = '') => url.indexOf('refresh-token') !== -1;

// refresh token 最大尝试次数
const refreshTokenRetryCount = 5;
let refreshTokenPromise: Promise<any> | null = null;

interface RequestParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: FormData | { [key: string]: any } | string;
  responseType?: 'json' | 'blob';
  noAuth?: boolean;
  contentType?: string;
  baseUrl?: string;
  retryCount?: number;
}

export type ResponseType<T> = {
  data: T;
  headers: Record<string, any>;
};

export const request = async <T>(
  params: RequestParams
): Promise<ResponseType<T>> => {
  const { noAuth = false } = params;
  const isRefreshToken = checkIsRefreshToken(params?.url);
  const retryCount = params.retryCount || 0;

  // 正在刷新token, 共用 refresh token 的请求
  if (refreshTokenPromise && !isRefreshToken && !noAuth) {
    await refreshTokenPromise;
    // 刷新成功
    return await request<T>(params);
  }

  const globalStore = getGlobalStore()!;
  const { getToken } = globalStore;
  const token = getToken();
  const language = i18n.global.locale.value;
  const {
    url,
    method = 'GET',
    data = {},
    contentType = 'application/json',
    responseType = 'json',
    baseUrl
  } = params;
  // headers
  const headers: Record<string, string> = {
    'content-type': contentType,
    'accept-language': language
  };
  // auth token
  if (token && !noAuth) {
    headers['Authorization'] = `Bearer ${token.accessToken}`;
  }
  // url
  const requestURL = baseUrl
    ? `${joinUrl(baseUrl, url)}`
    : `${joinUrl(apiBaseUrl, url)}`;
  // data: stirng or formdata
  let requestData: string | FormData;
  if (typeof data === 'object') {
    if (contentType === 'application/json') {
      requestData = JSON.stringify(data);
    } else {
      const form = new FormData();
      Object.keys(data).forEach((key) => {
        form.append(key, data[key]);
      });
      requestData = form;
    }
  } else {
    requestData = data;
  }

  try {
    const res = await fetch(requestURL, {
      method,
      headers,
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      mode: 'cors',
      body: requestData
    });
    const isSuccessCode = res.status >= 200 && res.status < 300;

    // 登录过期 / 未登录
    if (res.status === 401) {
      // 已经在刷新token
      if (refreshTokenPromise) {
        return refreshTokenPromise.then(() => {
          return request<T>(params);
        });
      }
      // 未登录，或者不需要refresh token
      if (!token || !USE_REFRESH_TOKEN) {
        globalStore.clearLogin();
        return await Promise.reject(
          new GeneralError('登录过期', { type: 'NO_AUTHORIZATION' })
        );
      }
      // 其他接口等等 refresh token 完成再调用
      let resolve: (v: any) => void;
      let reject: (v: any) => void;
      refreshTokenPromise = new Promise((rs, rj) => {
        resolve = (v) => {
          rs(v);
          refreshTokenPromise = null;
        };
        reject = (e) => {
          rj(e);
          refreshTokenPromise = null;
        };
      });
      // 登录过期，刷新token
      const promise = post<IToken>({
        url: '/v1/refresh-token',
        noAuth: true,
        data: {
          refreshToken: token.refreshToken
        }
      })
        .then((v) => {
          globalStore.setToken(v.data);
          resolve && resolve(v);
          return request<T>(params);
        })
        .catch((e) => {
          reject && reject(e);
          throw e;
        });

      return promise;
    }

    // 其他业务逻辑错误
    if (!isSuccessCode) {
      let data = {};
      try {
        data = await res.json();
      } catch (e) {}
      return Promise.reject(
        new GeneralError(
          (data as any).message || (data as any).error || ServerErrMsg,
          {
            info: data
          }
        )
      );
    }

    try {
      const data =
        responseType === 'json' ? await res.json() : await res.blob();
      return {
        data: data as unknown as T,
        headers: res.headers
      };
    } catch (e) {
      return Promise.reject(new GeneralError('错误的返回类型'));
    }
  } catch (e) {
    if (isRefreshToken && retryCount < refreshTokenRetryCount) {
      return request<T>({
        ...params,
        retryCount: retryCount + 1
      });
    }
    return Promise.reject(
      normalizeError('请检查您的网络设置后重试', { type: 'NETWORK_ERROR' })
    );
  }
};

export const get = <T>(params: RequestParams) => {
  return request<T>({
    ...params,
    method: 'GET'
  });
};

export const post = <T>(params: RequestParams) => {
  return request<T>({
    ...params,
    method: 'POST'
  });
};

export const put = <T>(params: RequestParams) => {
  return request<T>({
    ...params,
    method: 'PUT'
  });
};

export const patch = <T>(params: RequestParams) => {
  return request<T>({
    ...params,
    method: 'PATCH'
  });
};

export const del = <T>(params: RequestParams) => {
  return request<T>({
    ...params,
    method: 'DELETE'
  });
};
