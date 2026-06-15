import { create } from "zustand";

const usePoemListStore = create((set, get) => ({
    poemIds: [],
    setPoemIds: (ids) => set({ poemIds: ids }),
    getPrevId: (currentId) => {
        const { poemIds } = get();
        const idx = poemIds.indexOf(currentId);
        return idx > 0 ? poemIds[idx - 1] : null;
    },
    getNextId: (currentId) => {
        const { poemIds } = get();
        const idx = poemIds.indexOf(currentId);
        return idx !== -1 && idx < poemIds.length - 1 ? poemIds[idx + 1] : null;
    },
    getCurrentIndex: (currentId) => {
        const { poemIds } = get();
        return poemIds.indexOf(currentId);
    },
}));

export default usePoemListStore;
