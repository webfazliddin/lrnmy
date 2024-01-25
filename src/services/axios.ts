/**
 * axios setup to use mock service
 */

const { API_URL } = useAppUrl();
import { useAppUrl } from '@/composables/useAppUrl';
import axios from 'axios';

const axiosServices = axios.create();

axios.defaults.baseURL = API_URL.value;

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) =>
        Promise.reject(
            (error.response && error.response.data) || 'Wrong Services'
        )
);

export default axiosServices;
