import React, { useState } from "react";
import { poemCreation } from "../services/createPoemService";

const CreatePoemHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPoem = async (poemData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await poemCreation(poemData);
            return response;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { createPoem, isLoading, error }
};

export default CreatePoemHook;
