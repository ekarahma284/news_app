import { configureStore } from '@reduxjs/toolkit';
import saved from './slice/savedSlice';
import search from "./slice/searchSlice";

const store = configureStore({
    reducer: {
        savedArticles: saved,
        search: search,
    },
});

export default store;
