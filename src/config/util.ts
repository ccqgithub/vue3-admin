export const isDevelopment = import.meta.env.NODE_ENV === 'development';
export const baseUrl = import.meta.env.VITE_PUBLIC_URL || '';
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
export const bmapKey = import.meta.env.VITE_BMAP_KEY || '';
export const amapKey = import.meta.env.VITE_AMAP_KEY || '';
export const ssClients = (import.meta.env.VITE_SSO_CLIENTS || '').split(',');
