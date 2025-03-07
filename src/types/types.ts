export interface BookDetails {
  title: string
  author: string
  isbn: string
  dateRead: Date | string | undefined
  rating?: number | undefined
  description?: string
  note?: string
}

export interface BookDetailsDbRecord extends Omit<BookDetails, "dateRead"> {
  date_read: string | Date | null
}
