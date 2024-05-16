import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json', // set the headers
    }
});

// Add a request interceptor
instance.interceptors.request.use(
    config => {
        // Do something before request is sent
        return config;
    },
    (error: AxiosError) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Do something before request is sent
        if (response.status === 200) {
            return response;
        } else {
            return Promise.reject(response.data);
        }
    },
    (error: AxiosError) => {
        // Do something with response error
        return Promise.reject(error);
    }
);

export const get = async <T>(url: string, params?: string): Promise<T> => {
    try {
        const response = await instance.get<T>(url, { params });
        return response.data;
    } catch (error) {
        handleError(error)
        throw error;
    }
};
// POST request
export const post = async <T>(url: string, data?: any): Promise<T> => {
    try {
        const response = await instance.post<T>(url, data);
        return response.data;
    } catch (error) {
        handleError(error)
        throw error;
    }
};

// DELETE request
export const del = async <T>(url: string): Promise<T> => {
    try {
        const response = await instance.delete<T>(url);
        return response.data;
    } catch (error) {
        handleError(error)
        throw error;
    }
};

// PUT request
export const put = async <T>(url: string, data?: any): Promise<T> => {
    try {
        const response = await instance.put<T>(url, data);
        return response.data;
    } catch (error) {
        handleError(error)
        throw error;
    }
};

// Handle http request error
const handleError = (error: any) => {
    if (
        error?.response?.status == 400 ||
        error?.response?.status == 401 ||
        error?.response?.status == 403 ||
        error?.response?.status == 404
    ) {
        return error.code || error?.response?.data || error._message;
    } else {
        // Code is 500 system network error 
        return error.code || error._message;
    }
}