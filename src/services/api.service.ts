import axios from "axios";
import AuthService from "./auth.service";
import { notify } from "@kyvg/vue3-notification";

const ApiService = {
  _401interceptor: 0,
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  setHeader() {
    var auth = new AuthService();
    auth.getAccessToken().then((userToken: string) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    });
  },
  get(resource: string) {
    return axios.get(resource);
  },

  post(resource: string, data?: object, config?: any) {
    return axios.post(resource, data, config);
  },
  formData(resource: string, data: object) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  token(resource: string, data: object) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  },
  put(resource: string, data: object) {
    return axios.put(resource, data);
  },

  delete(resource: string) {
    return axios.delete(resource);
  },
  print(resourse: string) {
    return axios.get(resourse, {
      responseType: "blob"
    });
  },
  printTemp(resourse: string, data?: any) {
    return axios.post(resourse, data, {
      responseType: "blob"
    });
  },
  postfile(resourse: string, data: object) {
    return axios.post(resourse, data, {
      responseType: "blob"
    });
  },
  blobandjson(resourse: string, data: object) {
    return axios.post(resourse, data, {
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "blob"
    });
  },
  customRequest(data: any) {
    return axios(data);
  },

  mount401Interceptor() {
    const auth = new AuthService();

    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.request.status == 401) {
          auth.login();
        }

        if (error.request.status == 403) {
          window.location.href = "/error/403";
        }

        if (error.request?.status == 500) {
          notify({
            title: `status: ${error.request.status}`,
            text: `${error.request.responseText}`,
            type: "error"
          });
        }
        throw error;
      }
    );
  },

  unmount401Interceptor() {
    axios.interceptors.response.eject(this._401interceptor);
  }
};

export default ApiService;
