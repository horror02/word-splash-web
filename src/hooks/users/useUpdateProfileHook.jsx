import { useState } from "react";
import { updateProfile } from "../../services/users/userService";
import useUserStore from "../../setup/stores/UserStore";
import useAuthStore from "../../setup/stores/AuthStore";
import { jwtDecode } from "jwt-decode";

const useUpdateProfileHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserData } = useUserStore();
    const authLogin = useAuthStore((state) => state.authLogin);
    const expiresIn = useAuthStore((state) => state.expiresIn);

    const handleUpdateProfile = async (data) => {
        setIsLoading(true);
        try {
            const response = await updateProfile(data);
            if (response.token) {
                authLogin(response.token, expiresIn);
                const decoded = jwtDecode(response.token);
                setUserData(decoded);
            }
            return response;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleUpdateProfile };
};

export default useUpdateProfileHook;
