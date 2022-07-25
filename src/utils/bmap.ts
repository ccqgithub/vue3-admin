import { bmapKey } from '@/config';

export const loadBMap = async () => {
  return new Promise<void>((resolve, reject) => {
    const fnName = `loadBMapCallback${Math.round(Math.random() * 1000000)}`;
    (window as any)[fnName] = () => {
      resolve();
    };
    const script = document.createElement('script');
    script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${bmapKey}&callback=${fnName}`;
    script.onerror = (err) => {
      reject(err);
    };
    document.body.appendChild(script);
  });
};
