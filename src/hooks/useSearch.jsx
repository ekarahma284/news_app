import { useState, useEffect } from "react";

const useSearch = (query, dispatch, setSearchResults) => {
    const [beritaSearch, setBeritaSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                const API_KEY = process.env.REACT_APP_API_KEY;
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    const data = await response.json();
                    const articles = data.response.docs || [];
                    setBeritaSearch(articles);
                    dispatch(setSearchResults(articles));
                } catch (error) {
                    console.error("Error fetching articles:", error);
                    setShowAlert(true);
                    setAlertMessage("Failed to fetch articles. Please try again later.");
                    dispatch(setSearchResults([]));
                } finally {
                    setIsLoading(false);
                }
            };

            const delay = setTimeout(() => {
                fetchData();
            }, 1000);

            return () => clearTimeout(delay);
        }
    }, [query, dispatch, setSearchResults]);

    return { beritaSearch, isLoading, showAlert, alertMessage, setShowAlert, setAlertMessage };
};

export default useSearch;
