import React, { createContext, useContext, useState, useEffect } from "react";

const SavedContext = createContext();

export const useSaved = () => {
    return useContext(SavedContext);
};

export const SavedProvider = ({ children }) => {
    const [savedArticles, setSavedArticles] = useState([]);

    const saveArticle = (article) => {
        if (!savedArticles.some((item) => item.title === article.title)) {
            const updatedArticles = [...savedArticles, article];
            setSavedArticles(updatedArticles);

            localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
        }
    };

    const removeArticle = (index) => {
        const updatedArticles = savedArticles.filter((_, i) => i !== index);
        setSavedArticles(updatedArticles);
        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
    };

    useEffect(() => {
        const savedData = localStorage.getItem("savedArticles");
        if (savedData) {
            setSavedArticles(JSON.parse(savedData));
        }
    }, []);

    return (
        <SavedContext.Provider value={{ savedArticles, saveArticle, removeArticle }}>
            {children}
        </SavedContext.Provider>
    );
};
