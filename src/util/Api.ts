import qs from "qs";

const API_PATH = import.meta.env.VITE_API_BASE_URL;

type HttpMethod = "GET" | "POST";

interface ApiOptions {
  uri: string;
  method?: HttpMethod;
  params?: Record<string, string | number | undefined>;
  body?: Record<string, string | number | undefined>;
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
    ...(method === "POST" &&
      body && {
        body: new URLSearchParams(body as Record<string, string>),
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

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: number;
}

export const get = <T = unknown>(uri: string, params?: ApiOptions["params"]) =>
  api<T>({ uri, method: "GET", params });

export const post = <T = unknown>(uri: string, body?: ApiOptions["body"]) =>
  api<T>({ uri, method: "POST", body });

export const getProducts = (params?: Record<string, string | number>) =>
  get<Product[]>("exec", params);
