import AMapLoader from '@amap/amap-jsapi-loader';
import { amapKey } from '@/config';

export const loadAmap = async () => {
  return AMapLoader.load({
    key: amapKey,
    version: '2.0',
    plugins: []
  });
};
