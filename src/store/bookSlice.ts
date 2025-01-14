import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types/book";

interface BookState {
    searchResults: Book[];
    library: Book[];
    readingNowBooks: Book[];
    finishedBooks: Book[];
    readLaterBooks: Book[];
}

const initialState: BookState = {
    searchResults: [],
    library: [],
    readingNowBooks: [],
    finishedBooks: [],
    readLaterBooks: []
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setSearchResults(state, action: PayloadAction<Book[]>) {
            state.searchResults = action.payload;
        },
        addToLibrary(state, action: PayloadAction<Book>) {
            state.library.push(action.payload); // Возвращаем addToLibrary
        },
        addToReadingNow(state, action: PayloadAction<Book>) {
            state.readingNowBooks.push(action.payload);
        },
        addToFinished(state, action: PayloadAction<Book>) {
            state.finishedBooks.push(action.payload);
        },
        addToReadLater(state, action: PayloadAction<Book>) {
            state.readLaterBooks.push(action.payload);
        },
        removeFromReadingNow(state, action: PayloadAction<string>) {
            state.readingNowBooks = state.readingNowBooks.filter((book) => book.id !== action.payload);
        },
        removeFromFinished(state, action: PayloadAction<string>) {
            state.finishedBooks = state.finishedBooks.filter((book) => book.id !== action.payload);
        },
        removeFromReadLater(state, action: PayloadAction<string>) {
            state.readLaterBooks = state.readLaterBooks.filter((book) => book.id !== action.payload);
        },
    },
});

export const {
    setSearchResults,
    addToLibrary, // Теперь есть
    addToReadingNow,
    addToFinished,
    addToReadLater,
    removeFromReadingNow,
    removeFromFinished,
    removeFromReadLater,
} = bookSlice.actions;

export default bookSlice.reducer;