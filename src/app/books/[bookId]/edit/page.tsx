// src/app/books/[bookId]/edit/page.tsx
import { notFound } from "next/navigation"
import EditBookForm from "@/components/books/EditBookForm"
import { db } from "@/services/db"

export default async function EditBookPage({
  params,
}: {
  params: { bookId: string }
}) {
  const bookId = params.bookId

  // Fetch the book data server-side to pre-populate the form
  const bookData = await db.books.getById(bookId)

  if (!bookData) {
    notFound()
  }

  return <EditBookForm bookId={bookId} initialData={bookData} />
}
