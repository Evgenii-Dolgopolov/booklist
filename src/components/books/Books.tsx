// src/components/books/Books.tsx
import Link from "next/link"
import BookList from "@/components/books/BookList"
import { db } from "@/services/db"

export default async function Books() {
  // Fetch books
  // For now, we'll handle the case where getAll might not be implemented
  let books = []
  try {
    if (typeof db.books.getAll === "function") {
      books = await db.books.getAll()
    }
  } catch (error) {
    console.error("Error fetching books:", error)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Book Collection</h1>
        <Link
          href="/books/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Book
        </Link>
      </div>

      <BookList books={books} />
    </div>
  )
}
