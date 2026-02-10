import { useState, useEffect, useRef } from "react";

export const useMedia = (fetchFunction, titleField = 'title', dateField = 'release_date') => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filtros y ordenamiento
    const [searchTitle, setSearchTitle] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [sortBy, setSortBy] = useState("popularity");
    const [sortOrder, setSortOrder] = useState("desc");

    const mainRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchFunction(page);
                setItems(prevItems => (page === 1 ? data.results : [...prevItems, ...data.results]));
                setTotalPages(data.total_pages);
            } catch (err) {
                console.error("Error fetching media data:", err);
                setError("No se pudieron cargar los datos. Inténtalo de nuevo más tarde.");
            }
            setLoading(false);
        };

        fetchData();
    }, [page, fetchFunction]);

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !mainRef.current) return;

            const rect = mainRef.current.getBoundingClientRect();
            const isBottom = rect.bottom <= window.innerHeight + 100;

            if (isBottom && page < totalPages) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, page, totalPages]);


    const filteredItems = items
        .filter(item => {
            const name = item[titleField] || '';
            const matchesTitle = name
                .toLowerCase()
                .includes(searchTitle.toLowerCase());

            const date = item[dateField];
            const matchesYear = filterYear && date
                ? new Date(date).getFullYear().toString() === filterYear
                : filterYear ? false : true;

            const matchesGenre = filterGenre
                ? item.genre_ids.includes(parseInt(filterGenre))
                : true;

            return matchesTitle && matchesYear && matchesGenre;
        })
        .sort((a, b) => {
            const order = sortOrder === "asc" ? 1 : -1;

            switch (sortBy) {
                case "title":
                case "name":
                    return order * (a[titleField] || '').localeCompare(b[titleField] || '');
                case "rating":
                    return order * (a.vote_average - b.vote_average);
                case "date":
                    return order * (new Date(a[dateField]) - new Date(b[dateField]));
                default: // popularity
                    return order * (a.popularity - b.popularity);
            }
        });

    const uniqueYears = [...new Set(
        items.map(item => item[dateField] ? new Date(item[dateField]).getFullYear() : null)
    )].filter(year => year !== null && !isNaN(year) && year > 1900)
        .sort((a, b) => b - a);

    const clearFilters = () => {
        setSearchTitle("");
        setFilterYear("");
        setFilterGenre("");
        setSortBy("popularity");
        setSortOrder("desc");
    };

    return {
        items: filteredItems,
        loading,
        error,
        page,
        totalPages,
        searchTitle,
        setSearchTitle,
        filterYear,
        setFilterYear,
        filterGenre,
        setFilterGenre,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        mainRef,
        uniqueYears,
        clearFilters
    };
};
