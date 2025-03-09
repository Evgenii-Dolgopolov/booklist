// src/components/books/BookList.tsx
import React from "react"
import Link from "next/link"
import Card from "@/components/common/Card"
import { BookDetails } from "@/types/types"

interface BookListProps {
  books: BookDetails[]
}

export default function BookList({ books }: BookListProps) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium mb-4">No books found</h2>
        <p className="text-gray-600 mb-6">
          Start building your collection by adding your first book
        </p>
        <Link
          href="/books/add"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Your First Book
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <Link href={`/books/${book.id}`} key={book.id} className="block">
          <Card
            className="h-full hover:border-blue-300 transition-colors"
            border={true}
            elevation="low"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-medium mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-3">by {book.author}</p>

              {book.rating && (
                <div className="flex items-center mb-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Rating: {book.rating}/10
                  </span>
                </div>
              )}

              {book.description && (
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {book.description}
                </p>
              )}

              <div className="mt-auto">
                <span className="text-blue-600 text-sm font-medium">
                  View details →
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
