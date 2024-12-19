import { useEffect, useState } from "react";

const useTechnology = () => {
    const [beritaProgramming, setBeritaProgramming] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    
    
    useEffect(() => {
        const fetchData = () => {
            const API_KEY = process.env.REACT_APP_API_KEY;
            
            fetch(`https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setBeritaProgramming(data.results);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching berita utama:", error);
                    setIsLoading(false);
                });
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    return {
        beritaProgramming,
        isLoading,
        showAlert,
        alertMessage,
        setAlertMessage,
        setShowAlert
    }
};

export default useTechnology;