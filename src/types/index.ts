// src/types/types.ts

export interface BookDetails {
  id?: number
  title: string
  author: string
  isbn: string
  dateRead?: Date | string | undefined
  rating?: number | undefined
  description?: string
  note?: string
}

export interface BookDetailsData {
  id: number;
  title: string;
  author: string;
  isbn: string;
  rating: number;
  description: string;
  note: string;
  dateRead?: Date;
}

export interface BookDetailsDbRecord extends Omit<BookDetails, "dateRead" | "id"> {
  id: number
  date_read: string
}

export interface initialBookDetails {
  title: string
  author: string
  isbn: string
  rating: undefined
  description: string
  note: string
}

