// src/types/types.ts

export interface BookDetails {
  id?: string
  title: string
  author: string
  isbn: string
  dateRead?: Date | string | undefined
  rating?: number | undefined
  description?: string
  note?: string
}

export interface BookDetailsDbRecord extends Omit<BookDetails, "dateRead"> {
  id: string
  date_read: string | Date | null
}

export interface initialBookDetails {
  title: string
  author: string
  isbn: string
  rating: undefined
  description: string
  note: string
}

