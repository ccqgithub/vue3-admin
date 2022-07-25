import querystring from 'query-string';
import { i18n } from '@/i18n';

export const joinUrl = (...paths: string[]) => {
  const url = paths.join('/');
  return url.replace(/(^|\w)[\/]{2,}/g, '$1/');
};

export const joinUrlParams = (url: string, params: Record<string, string>) => {
  const base = url.split('?')[0];
  const search = url.replace(/^.+?\?/, '');
  const data = querystring.parse(search);
  return `${base}?${querystring.stringify({ ...data, ...params })}`;
};

export const joinUrlLang = (url: string) => {
  return joinUrlParams(url, { lang: i18n.global.locale.value });
};
