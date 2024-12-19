import { useEffect, useState } from 'react';

const useMostPopuler = () => {
    const [mostPopuler, setMostPopuler] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = () => {
            const API_KEY = process.env.REACT_APP_API_KEY;
            fetch(`https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setMostPopuler(data.results);
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
        mostPopuler,
        isLoading
    };
};

export default useMostPopuler;
