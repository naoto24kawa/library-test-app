/**
 * NOTICE
 * VITEで環境変数を設定できるのはビルド時のみ
 * ビルド時にはサーバーが起動していないため、
 * サーバーの環境変数はimport.meta.envではなくprocess.envで取得する必要がある
 * また、サーバーの環境変数はroot.tsxでWindowに配置しないとフロントで利用できない
 */
// app
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const APP_URL = import.meta.env.VITE_APP_URL;
export const APP_PORT = import.meta.env.VITE_APP_PORT;
export const APP_HOST = `${APP_URL}:${APP_PORT}`;

// server
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
export const SERVER_HOST = `${SERVER_URL}:${SERVER_PORT}`;

// remix auth
export const SESSION_SECRET = import.meta.env.VITE_SESSION_SECRET;
