import axios, { AxiosInstance, AxiosResponse } from 'axios';

let apiUrl = import.meta.env.VITE_API_URL;
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
    (error) => {
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
    (error) => {
        // Do something with response error
        const status = error.response?.status;
        console.log(error)
        switch (status) {
            case 400:
                break;
            case 401:
                break;
            case 403:
                break;
            case 404:
                break;
            case 500:
                break;
            default:
        }
        return Promise.reject(error);
    }
);

export const get = async <T>(url: string, params?: any): Promise<T> => {
    try {
        const response = await instance.get<T>(url, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// POST request
export const post = async <T>(url: string, data?: any): Promise<T> => {
    try {
        const response = await instance.post<T>(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// DELETE request
export const del = async <T>(url: string): Promise<T> => {
    try {
        const response = await instance.delete<T>(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PUT request
export const put = async <T>(url: string, data?: any): Promise<T> => {
    try {
        const response = await instance.put<T>(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
