import qs from "qs";
import { PostApiResponse, Product } from "../App";

const API_PATH = import.meta.env.VITE_API_BASE_URL;

type HttpMethod = "GET" | "POST";

interface ApiOptions {
  uri: string;
  method?: HttpMethod;
  params?: Record<string, string | number | undefined>;
  body?: Record<string, unknown>;
}

const api = async <T = unknown>({
  uri,
  method = "GET",
  params,
  body,
}: ApiOptions): Promise<T> => {
  let url = `${API_PATH}/${uri}`;

  if (params) {
    Object.keys(params).forEach(
      (key) => params[key] === "" && delete params[key],
    );
    url += `?${qs.stringify(params)}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      ...(method === "POST" && {
        "Content-Type": "application/json",
      }),
    },
    ...(method === "POST" &&
      body && {
        body: JSON.stringify(body),
      }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      ...data,
      status: res.status,
      statusText: res.statusText,
    };
  }

  return data as T;
};

export const get = <T = unknown>(uri: string, params?: ApiOptions["params"]) =>
  api<T>({ uri, method: "GET", params });

export const post = <T = unknown>(uri: string, body?: ApiOptions["body"]) =>
  api<T>({ uri, method: "POST", body });

export const getProducts = (params?: Record<string, string | number>) =>
  get<Product[]>("exec", params);

export const saveOrUpdateProduct = (body: Record<string, string | number>) =>
  post<PostApiResponse>("exec", body);
