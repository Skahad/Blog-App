import axios from "axios";
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config";
import { getAccessToken } from "../utils/common-utils";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json,multipart/form-data",
    // "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

/// if success -> return {isSuccess:true,data: Object}
/// if fail -> return { isFailure:true, status: string, msg: string, code: int }

const processResponse = (response) => {
  if (response?.status === 200) {
    return {
      isSuccess: true,
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.data?.msg,
      code: response?.data?.code,
    };
  }
};

/// if success -> return {isSuccess:true,data: Object}
/// if fail -> return { isFailure:true, status: string, msg: string, code: int }

const processError = (error) => {
  if (error.response) {
    //response made and server responded with a status code that falls out of the range of 2xx
    console.log("ERROR IN RESPONSE", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGE.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    //request made but no response was received
    console.log("ERROR IN RESPONSE", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGE.requestFailure,
      code: "",
    };
  } else {
    //something happened in setting up the request that triggered an Error
    console.log("ERROR IN RESPONSE", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGE.networkFailure,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, customUrl = "", showDownloadProgress) => {
    let params = {};
    if (value.params) {
      params = body;
      body = {};
    }

    return axiosInstance({
      method: value.method,
      url: customUrl || value.url, // ✅ Use custom URL if provided (for /post/:id)
      data: body,
      params,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
        'Content-Type': value.isFormData ? 'multipart/form-data' : 'application/json', // ✅ dynamic content type
      },
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
  };
}

export { API };
