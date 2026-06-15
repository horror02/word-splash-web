import { useState } from "react";
import { fetchPoems } from "../../services/poems/poemServices";
import usePoemListStore from "../../setup/stores/PoemListStore";

const getAllPoemsHook = () => {
    const [poems, setPoems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const setPoemIds = usePoemListStore((state) => state.setPoemIds);

    const fetchAllPoems = async ({ pageSize = 6, offsetValue = 0, search = "" } = {}) => {
        setIsLoading(true);
        try {
            const response = await fetchPoems({ pageSize, offsetValue, search });
            setPoems(response.data);
            setTotalPages(response.meta.totalPages);
            setPoemIds(response.data.map((p) => p._id));
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { poems, totalPages, isLoading, fetchAllPoems };
};

export default getAllPoemsHook;
