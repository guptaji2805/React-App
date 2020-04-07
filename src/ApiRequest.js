import axios from "axios";

const baseURL = process.env.BASE_URL_NODE;

export const getCookie = name => {
  if (!document.cookie) {
    return null;
  }
  const token = document.cookie
    .split(";")
    .map(c => c.trim())
    .filter(c => c.startsWith(name + "="));

  if (token.length === 0) {
    return null;
  }

  return decodeURIComponent(token[0].split("=")[1]);
};

export const getCsrfToken = () => getCookie("csrftoken");

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json"
  },
  withCredentials: true
});

export const makeGetRequest = (endpoint, params = {}, headers) => {
  const options = {
    method: "GET",
    headers: { ...headers },
    params: params,
    url: endpoint
  };

  return axiosInstance(options)
    .then(resp => resp.data)
    .catch(e => {
      console.log(e);
      throw e;
    });
};

export const makePostRequest = (
  endpoint,
  params = {},
  headers,
  onUploadProgress
) => {
  const options = {
    method: "POST",
    headers: { ...headers },
    data: params,
    url: endpoint,
    onUploadProgress
  };

  return axiosInstance(options)
    .then(resp => resp.data)
    .catch(e => {
      const errorObj = { status: e.response.status, ...e.response.data };
      throw errorObj;
    });
};

export const makePutRequest = (
  endpoint,
  params = {},
  headers,
  onUploadProgress
) => {
  const options = {
    method: "PUT",
    headers: { ...headers },
    data: params,
    url: endpoint,
    onUploadProgress
  };

  return axiosInstance(options)
    .then(resp => resp.data)
    .catch(e => {
      throw e.response.data;
    });
};

export const makeDeleteRequest = (endpoint, params = {}, headers) => {
  const options = {
    method: "DELETE",
    headers: { ...headers },
    data: params,
    url: endpoint
  };

  return axiosInstance(options)
    .then(resp => resp.data)
    .catch(e => {
      throw e.response.data;
    });
};
