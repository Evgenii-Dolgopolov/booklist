// src/app/books/[bookId]/page.tsx

import BookDetails from "@/components/books/BookDetail"

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ bookId: string }>
}) {
  
  const bookId = (await params).bookId

  return (
    <>
      <BookDetails bookId={bookId} />
    </>
  )
}
