const api_url = `https://api.nasa.gov/neo/rest/v1/feed`;
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.headers = {
      Accept: "application/json",
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default {
  async getAsteroids(start_date, end_date) {
    let output = {
      data: null,
      error: null,
    };
    let url = `${api_url}?start_date=${start_date}&end_date=${end_date}&api_key=DEMO_KEY`;;
    try {
      const response = await axios.get(url);
      output.data = response.data;
      return output;
    } catch (error) {
      output.error = this.errorHandling(error);
      return output;
    }
  },
  errorHandling(error) {
    if (error.response) {
      if (error.response.data.message) {
        return error.response.data.message;
      } else if (error.response.status) {
        if (error.response.status == 401) {
          return "UnAuthorized";
        }
        if (error.response.status == 403) {
          return "Forbidden";
        }
        if (error.response.status == 404) {
          return "Not Found";
        }
        if (error.response.status === 418 || error.response.status === 422) {
          return "Invalid";
        }
        if (error.response.status === 429) {
          return "Too many requests. Please wait for some time";
        }
        if (error.response.status === 498) {
          return "OTP Expired";
        }
        return "unknown error";
      } else if (error.response.headers) {
        return error.response.headers;
      }
    } else if (error.request) {
      return "request error";
    } else {
      return error.message;
    }
    return "config error";
  },
};
