/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { _handleClearCookiesAndSession } from "../../utils";

const URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const apiResource = () => {
  const api = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const internalConfig = config as any;
      internalConfig.headers = internalConfig.headers ?? {};
      const access_token = Cookies.get("access_token");
      const token_type = Cookies.get("token_type");
      if (!access_token) return internalConfig;
      internalConfig.headers["Authorization"] = `${token_type} ${access_token}`;
      return internalConfig;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) =>
      new Promise((resolve) => {
        resolve(response);
      }),
    async (error) => {
      const status_code = error?.response?.status;
      const _error_code_401 = status_code === 401;
      const _error_code_403 = status_code === 403;
      if (_error_code_403) {
        _handleClearCookiesAndSession();
      } else if (_error_code_401) {
        window.location.href = "/";
        _handleClearCookiesAndSession();
      } else {
        return new Promise((_, reject) => {
          reject(error?.response);
        });
      }
      return Promise.reject(error?.response);
    }
  );

  return api;
};

export const api = apiResource();
