// src/utils/transformers.ts
import { BookDetails, BookDetailsData, BookDetailsDbRecord } from "@/types"

export function transformDbRecordToBookDetails(
  record: BookDetailsDbRecord
): BookDetailsData {
  return {
    id: record.id,
    title: record.title,
    author: record.author,
    isbn: record.isbn,
    dateRead: record.date_read ? new Date(record.date_read) : undefined,
    rating: record.rating !== undefined ? record.rating : 0,
    description: record.description || "",
    note: record.note || "",
  }
}

export function transformBookDetailsToDbRecord(
  book: BookDetails
): BookDetailsDbRecord {
  if (book.id === undefined || !book.title || !book.author || !book.isbn) {
    throw new Error("Missing required book details")
  }

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    date_read: book.dateRead ? new Date(book.dateRead).toISOString() : "",
    rating: book.rating,
    description: book.description || "",
    note: book.note || "",
  }
}
