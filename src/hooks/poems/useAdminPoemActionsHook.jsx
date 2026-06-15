import { useState } from "react";
import { updatePoem, deletePoem } from "../../services/poems/adminPoemService";

const useAdminPoemActionsHook = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (id, data) => {
        setIsLoading(true);
        try {
            return await updatePoem(id, data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            return await deletePoem(id);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleUpdate, handleDelete };
};

export default useAdminPoemActionsHook;
