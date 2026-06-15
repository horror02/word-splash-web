import WordInstance from "../../setup/axios/WordInstance";
import { API_ENDPOINTS } from "../../utils/constant-helper";

export const fetchPoems = async ({ pageSize, offsetValue, search } = {}) => {
    try {
        const response = await WordInstance.get(`${API_ENDPOINTS.POEMS}`, {
            params: { pageSize, offsetValue, search },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPoem = async (id) => {
    try {
        const response = await WordInstance.get(`${API_ENDPOINTS.POEM}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
