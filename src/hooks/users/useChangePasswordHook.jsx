import { useState } from "react";
import { changePassword } from "../../services/users/userService";

const useChangePasswordHook = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async (data) => {
        setIsLoading(true);
        try {
            return await changePassword(data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleChangePassword };
};

export default useChangePasswordHook;
