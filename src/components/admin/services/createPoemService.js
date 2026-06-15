import WordInstance from "../../../setup/axios/WordInstance";

export const poemCreation = async (poemData) => {
    try {
        const response = await WordInstance.post("/v1/poem", poemData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
