import { create } from "zustand";
import toast from "react-hot-toast";
import { devtools, persist } from "zustand/middleware";

const useAuthStore = create(
    devtools(
        persist(
            (set) => ({
                token: null,
                expiresIn: null,

                authLogin: (token, expiresIn) => set({ token, expiresIn }),

                authLogout: () => {
                    set({ token: null, expiresIn: null });
                    toast.success("Logged out successfully");
                },
            }),
            {
                name: "auth-storage",
            }
        )
    )
);

export default useAuthStore;
