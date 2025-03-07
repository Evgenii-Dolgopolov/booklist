// src/utils/transformers.ts
import { BookDetails, BookDetailsDbRecord } from "@/types"

export function transformDbRecordToBookDetails(
  record: BookDetailsDbRecord
): BookDetails {
  return {
    id: record.id,
    title: record.title,
    author: record.author,
    isbn: record.isbn,
    dateRead: record.date_read ? new Date(record.date_read) : undefined,
    rating: record.rating,
    description: record.description,
    note: record.note,
  }
}

export function transformBookDetailsToDbRecord(
  book: Partial<BookDetails>
): BookDetailsDbRecord {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    date_read:
      book.dateRead instanceof Date
        ? book.dateRead.toISOString().split("T")[0]
        : null,
    rating: book.rating,
    description: book.description,
    note: book.note,
  }
}
