import apiCall from "./apiCall";
import Cookies from "js-cookie";

apiCall.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class HttpServices {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }


  async getAll<T>() {
    const res = await apiCall.get<T>(this.endpoint);
    return res.data;
  }

  async getAllWithSearch<T>(search?: string, page?: number, limit?: number) {
    const res = await apiCall.get<T>(`${this.endpoint}`, {
      params: {
        search,
        page,
        limit
      }
    });
    return res.data;
  }


  async getAllWithQuery<T>(search?: string, filterName?: string, op?: string, query?: string, page = 1, limit = 5) {
    // const params = new URLSearchParams();

    // if (search) params.append("search", search);
    // if (filterName && op && query) params.append(`${filterName}[${op}]`, query);
    // if (page) params.append("page", page.toString());
    // if (limit) params.append("limit", limit.toString());


    // const url = params.toString()
    //   ? `${this.endpoint}?${params.toString()}`
    //   : this.endpoint;

    const params: Record<string, unknown> = {
      page,
      limit,
    };

    if (search) params.search = search;

    if (filterName && op && query) {
      params[`${filterName}[${op}]`] = query;
    }

    const { data } = await apiCall.get<T>(this.endpoint, {
      params
    });
    return data;
  }

  async post<T>(data: unknown) {
    const res = await apiCall.post<T>(this.endpoint, data);
    return res.data;
  }


  async delete<T>(id: number) {
    const res = await apiCall.delete<T>(`${this.endpoint}/${id}`);
    return res.data;
  }

  async put<T>(id: number, data: unknown) {
    const res = await apiCall.put<T>(`${this.endpoint}/${id}`, data);
    return res.data;
  }

  async getById<T>(id: number) {
    const res = await apiCall.get<T>(`${this.endpoint}/${id}`);
    return res.data;
  }
}

export default HttpServices;
