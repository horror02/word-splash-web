import WordInstance from "../../setup/axios/WordInstance";
import { API_ENDPOINTS } from "../../utils/constant-helper";

export const updatePoem = async (id, data) => {
    try {
        const response = await WordInstance.put(`${API_ENDPOINTS.POEM}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePoem = async (id) => {
    try {
        const response = await WordInstance.delete(`${API_ENDPOINTS.POEM}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
