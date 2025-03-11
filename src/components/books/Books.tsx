// src/components/books/BookList.tsx

"use client"

import React, { useEffect, useState } from "react"
import { BookDetailsDbRecord, BookDetails } from "@/types"
import { formatDateToDDMMYYYY } from "@/utils/formatters"
import { transformDbRecordToBookDetails } from "@/utils/transformers"

export default function Books() {
  const [books, setBooks] = useState<BookDetails[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/books/api")
        if (!response.ok) {
          throw new Error("Failed to fetch books")
        }

        const data = await response.json()

        // Transform the data before saving it to state
        const transformedBooks = data.books.map(
          (record: BookDetailsDbRecord) => {
            const book = transformDbRecordToBookDetails(record)

            // Format the dateRead field if it exists
            if (book.dateRead) {
              book.dateRead = new Date(book.dateRead) // Ensure it's a Date object
            }

            return book
          }
        )

        setBooks(transformedBooks)
      } catch (err) {
        setError("An error occurred while fetching books.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Book List</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              {book.dateRead && (
                <p>Date Read: {formatDateToDDMMYYYY(new Date(book.dateRead))}</p>
              )}
              <p>Rating: {book.rating}</p>
              <p>Description: {book.description}</p>
              <p>Note: {book.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
