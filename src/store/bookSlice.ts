import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types/book";

interface BookState {
    searchResults: Book[];
    library: Book[];
}

const initialState: BookState = {
    searchResults: [],
    library: [],
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setSearchResults(state, action: PayloadAction<Book[]>) {
            state.searchResults = action.payload;
        },
        addToLibrary(state, action: PayloadAction<Book>) {
            state.library.push(action.payload);
        },
        removeFromLibrary(state, action: PayloadAction<string>) {
            state.library = state.library.filter((book) => book.id !== action.payload);
        },
    },
});

export const { setSearchResults, addToLibrary, removeFromLibrary } = bookSlice.actions;
export default bookSlice.reducer;