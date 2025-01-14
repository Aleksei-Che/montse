// src/types/book.ts
export interface Book {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    readingStartTime?: string;
    finishedTime?: string; // добавляем это поле
    readingTime?: string;
}