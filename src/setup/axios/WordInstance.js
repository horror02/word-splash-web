import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import toast from "react-hot-toast";

const WordInstance = axios.create({
    baseURL: import.meta.env.VITE_WORD_GATEWAY,
});

WordInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        console.log(useAuthStore);
        console.log("Auth header:", config.headers.Authorization);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

WordInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            useAuthStore.getState().token
        ) {
            const authLogout = useAuthStore.getState().authLogout;
            authLogout();
            toast.error("Session expired. Please log in again.");
        }
        return Promise.reject(error);
    }
);

export default WordInstance;
