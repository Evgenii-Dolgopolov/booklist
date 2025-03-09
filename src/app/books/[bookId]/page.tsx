// src/app/books/[bookId]/page.tsx
import BookDetails from "@/components/books/BookDetail"

export default function BookDetailsPage({
  params,
}: {
  params: { bookId: string }
}) {
  const bookId = params.bookId

  return <BookDetails bookId={bookId} />
}
