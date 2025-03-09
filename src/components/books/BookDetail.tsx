// src/components/books/BookDetail.tsx
import React from "react"
import Link from "next/link"
import { db } from "@/services/db"
import { formatDateToDDMMYYYY } from "@/utils/formatters"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import DeleteBookButton from "@/components/books/DeleteBookButton"
import { notFound } from "next/navigation"

export default async function BookDetails({ bookId }: { bookId: string }) {
  // Fetch book data
  const book = await db.books.getById(bookId)

  if (!book) {
    notFound()
  }

  // Format date if exists
  const formattedDate = book.dateRead
    ? formatDateToDDMMYYYY(new Date(book.dateRead))
    : "Not specified"

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/books"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Books
        </Link>
      </div>

      <Card border={true} padding="large" className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-700">by {book.author}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {book.isbn && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">ISBN</h3>
              <p>{book.isbn}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Date Read
            </h3>
            <p>{formattedDate}</p>
          </div>

          {book.rating && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Rating</h3>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {book.rating}/10
                </span>
              </div>
            </div>
          )}
        </div>

        {book.description && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="prose max-w-none">
              <p>{book.description}</p>
            </div>
          </div>
        )}

        {book.note && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Notes</h2>
            <div className="prose max-w-none bg-gray-50 p-4 rounded-md">
              <p>{book.note}</p>
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          isLink={true}
          href={`/books/${bookId}/edit`}
          variant="secondary"
        >
          Edit
        </Button>

        <DeleteBookButton bookId={bookId} bookTitle={book.title} />
      </div>
    </div>
  )
}
