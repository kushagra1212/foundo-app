//export const BASE_URL = 'https://foundo-server.vercel.app';

export const BASE_URL = process.env.BASE_URL as string;
export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = process.env
  .LOCAL_STORAGE_ACCESS_TOKEN_KEY as string;
