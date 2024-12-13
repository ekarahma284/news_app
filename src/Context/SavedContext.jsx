import React, { createContext, useContext, useState, useEffect } from "react";

// Buat Context
const SavedContext = createContext();

export const useSaved = () => {
    return useContext(SavedContext);
};

// Provider untuk membungkus aplikasi
export const SavedProvider = ({ children }) => {
    const [savedArticles, setSavedArticles] = useState([]);

    // Fungsi untuk menyimpan artikel ke state dan localStorage
    const saveArticle = (article) => {
        // Cek apakah artikel sudah ada
        if (!savedArticles.some((item) => item.title === article.title)) {
            const updatedArticles = [...savedArticles, article];
            setSavedArticles(updatedArticles);

            // Simpan ke localStorage
            localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
        }
    };

    // Fungsi untuk menghapus artikel berdasarkan index dari state dan localStorage
    const removeArticle = (index) => {
        const updatedArticles = savedArticles.filter((_, i) => i !== index); // Hapus artikel berdasarkan index
        setSavedArticles(updatedArticles); // Perbarui state
        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles)); // Simpan ke localStorage
    };

    // Ambil artikel yang disimpan dari localStorage saat aplikasi pertama kali dimuat
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
