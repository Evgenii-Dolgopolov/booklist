// src/utils/transformers.ts
import { BookDetails, BookDetailsDbRecord } from "@/types/types"

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
  // Check if required fields exist, throw error if not
  if (!book.id || !book.title || !book.author || !book.isbn) {
    throw new Error("Missing required book details")
  }

  return {
    id: book.id, // Now TypeScript knows this is not undefined
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    // Add the rest of your transformation logic here
    date_read: book.dateRead ? new Date(book.dateRead).toISOString() : null,
    rating: book.rating,
    description: book.description,
    note: book.note,
  }
}
