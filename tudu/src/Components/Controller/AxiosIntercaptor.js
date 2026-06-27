import axios from 'axios'
// import { JwtRefreshApi } from './JwtRefreshApi';

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
    }
        return Promise.reject(error);
    }
);