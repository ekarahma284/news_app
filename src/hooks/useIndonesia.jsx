import { useEffect, useState } from 'react';

const useIndonesia = () => {
    const [movieIndonesia, setMovieIndonesia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        const fetchData = () => {
            const API_KEY = process.env.REACT_APP_API_KEY;
            fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=indonesian&api-key=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setMovieIndonesia(data.response.docs);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching articles:", error);
                    setIsLoading(false);
                });
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    return {
        movieIndonesia,
        isLoading,
        alertMessage,
        showAlert,
        setShowAlert,
        setAlertMessage,
    };
};

export default useIndonesia;
