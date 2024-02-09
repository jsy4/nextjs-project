
import { message } from 'antd';
import axios, { AxiosInstance } from 'axios';
import { assign } from 'lodash';
import { useRouter } from 'next/navigation';

class axiosClient {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL:'http://localhost:3002',
      withCredentials: true,
    });
  }

  async setHeader(userToken = null) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  }

  getRequestUrl(resource: string) {
    // admin API
    return this.instance.defaults.baseURL + '/' + resource;
  }

  get<T = any>(resource: string, config: any = {}): Promise<any> {
    return this.instance
      .get<T>(this.getRequestUrl(resource), assign(config, this.instance.defaults.headers))
      .then((response) => response);
  }

  post<T = any>(resource: string, data: any, config: any = {}): Promise<any> {
    return this.instance
      .post<T>(this.getRequestUrl(resource), data, assign(config, this.instance.defaults.headers))
      .then((response) => response);
  }

  update<T = any>(resource: string, data: any, config: any = {}): Promise<any> {
    return this.instance
      .put<T>(this.getRequestUrl(resource), data, assign(config, this.instance.defaults.headers))
      .then((response) => response);
  }

  put<T = any>(resource: string, data: any, config: any = {}): Promise<any> {
    return this.instance
      .put<T>(this.getRequestUrl(resource), data, assign(config, this.instance.defaults.headers))
      .then((response) => response);
  }

  patch<T = any>(resource: string, data: any, config: any = {}): Promise<any> {
    return this.instance
      .patch<T>(this.getRequestUrl(resource), data, assign(config, this.instance.defaults.headers))
      .then((response) => response);
  }

  delete<T = any>(resource: string, data: any, config: any = {}): Promise<any> {
    return this.instance
      .delete<T>(this.getRequestUrl(resource), {
        params: data,
        ...assign(config, { headers: this.instance.defaults.headers }),
      })
      .then((response) => response);
  }
}

const AxiosClient = new axiosClient();

export default AxiosClient;
