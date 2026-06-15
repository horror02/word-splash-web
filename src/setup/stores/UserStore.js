import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


const user = {};

const useUserStore = create(
    devtools(
        persist(
            (set, get) => ({
                userData: user,
                setUserData: (newUserData) => set({ userData: newUserData }),
                updateUser: (updatedUserData) => {
                    set((state) => ({
                        userData: {
                            ...state.userData,
                            ...updatedUserData,
                        },
                    }));
                },
                resetUserData: () => set({ userData: user}),
            }),
            {
                name: "user-storage",
                getStorage: () => localStorage,
                partialize: (state) => ({ userData: state.userData }),
            }
        )
    )
)

export default useUserStore;