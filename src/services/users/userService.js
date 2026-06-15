import WordInstance from "../../setup/axios/WordInstance";
import { API_ENDPOINTS } from "../../utils/constant-helper";

export const updateProfile = async (data) => {
    try {
        const response = await WordInstance.put(API_ENDPOINTS.USER_PROFILE, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (data) => {
    try {
        const response = await WordInstance.put(API_ENDPOINTS.USER_PASSWORD, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
