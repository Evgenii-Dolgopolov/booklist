// src/components/books/BookDetail.tsx

import { BookDetailsData, BookDetailsDbRecord } from "@/types"
import { formatDateToDDMMYYYY } from "@/utils/formatters"
import { transformDbRecordToBookDetails } from "@/utils/transformers"

export default async function BookDetails({ bookId }: { bookId: string }) {
  const response = await fetch(`http://localhost:3000/books/${bookId}/api`)
  if (!response.ok) {
    throw new Error("Failed to fetch book details")
  }

  const bookData: BookDetailsDbRecord = await response.json()
  const book: BookDetailsData = transformDbRecordToBookDetails(bookData)

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Rating: {book.rating}</p>
      <p>Description: {book.description}</p>
      <p>Note: {book.note}</p>
      {book.dateRead && <p>Date Read: {formatDateToDDMMYYYY(book.dateRead)}</p>}
    </div>
  )
}
