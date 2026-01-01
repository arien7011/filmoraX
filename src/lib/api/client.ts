import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError,
} from "axios";
import { apiConfig } from "@/config";

// Create axios instance with Bearer token authentication
const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiConfig.accessToken}`,
  },
});

// Request interceptor - Add language parameter
apiClient.interceptors.request.use(
  (config) => {
    // Add default language parameter
    config.params = {
      ...config.params,
      language: "en-US",
    };

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - API key issue
          console.error("Invalid API key");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 429:
          // Rate limited - retry with exponential backoff
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            await new Promise((resolve) =>
              setTimeout(resolve, apiConfig.retryDelay)
            );
            return apiClient(originalRequest);
          }
          break;
        case 500:
        case 502:
        case 503:
          // Server error - retry
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            await new Promise((resolve) =>
              setTimeout(resolve, apiConfig.retryDelay)
            );
            return apiClient(originalRequest);
          }
          break;
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
