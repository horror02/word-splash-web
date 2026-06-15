import { useState } from "react";
import { fetchPoem } from "../../services/poems/poemServices";

const getPoemHook = () => {
    const [poem, setPoem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOnePoem = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetchPoem(id);
            setPoem(response.data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { poem, isLoading, fetchOnePoem };
};

export default getPoemHook;
