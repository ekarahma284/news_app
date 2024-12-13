import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('savedArticles')) || [];

const savedSlice = createSlice({
    name: 'savedArticles',
    initialState,
    reducers: {
        addArticle: (state, action) => {
            state.push(action.payload);
            localStorage.setItem('savedArticles', JSON.stringify(state));
        },
        removeArticle: (state, action) => {
            const updatedState = state.filter((_, index) => index !== action.payload);
            localStorage.setItem('savedArticles', JSON.stringify(updatedState));
            return updatedState;
        },
    },
});

export const { addArticle, removeArticle } = savedSlice.actions;
export default savedSlice.reducer;
