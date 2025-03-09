// src/components/books/EditBookForm.tsx
"use client"

import React, { useState, useEffect } from "react"
import { useBookForm } from "@/hooks/useBookForm"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import { BookDetails } from "@/types/types"

interface EditBookFormProps {
  bookId: string
  initialData?: Partial<BookDetails>
}

export default function EditBookForm({
  bookId,
  initialData,
}: EditBookFormProps) {
  const [isLoading, setIsLoading] = useState(!initialData)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const {
    bookDetails,
    setBookDetails,
    error: saveError,
    handleChange,
    handleSubmit: handleFormSubmit,
  } = useBookForm(initialData || {})

  // Fetch book data if not provided as initialData
  useEffect(() => {
    const fetchBookData = async () => {
      if (initialData) return

      try {
        const response = await fetch(`/api/books/${bookId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch book details")
        }

        const data = await response.json()
        setBookDetails(data.data)
      } catch (err) {
        setFetchError(
          err instanceof Error ? err.message : "Failed to load book details"
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookData()
  }, [bookId, initialData, setBookDetails])

  // Custom submit handler for edit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookDetails),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `Failed to update book (${response.status})`
        )
      }

      // Use the router from useBookForm hook
      handleFormSubmit(e)
    } catch (err) {
      console.error("Error updating book:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Card
          padding="large"
          border={true}
          className="flex justify-center items-center py-12"
        >
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-700">Loading book details...</p>
          </div>
        </Card>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Card padding="large" border={true} className="bg-red-50">
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-medium text-red-800 mb-2">
              Error Loading Book
            </h2>
            <p className="text-red-700">{fetchError}</p>
            <div className="mt-6">
              <Button isLink={true} href="/books" variant="secondary">
                Back to Books
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

      <Card className="mb-6" padding="large" border={true}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {saveError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {saveError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={bookDetails.title || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block font-medium">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={bookDetails.author || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="isbn" className="block font-medium">
                ISBN
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={bookDetails.isbn || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dateRead" className="block font-medium">
                Date Read
              </label>
              <input
                type="date"
                id="dateRead"
                name="dateRead"
                value={
                  typeof bookDetails.dateRead === "string"
                    ? bookDetails.dateRead.split("T")[0]
                    : bookDetails.dateRead instanceof Date
                    ? bookDetails.dateRead.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="block font-medium">
                Rating (1-10)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="10"
                value={bookDetails.rating || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={bookDetails.description || ""}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="block font-medium">
              Notes
            </label>
            <textarea
              id="note"
              name="note"
              value={bookDetails.note || ""}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button isLink={true} href={`/books/${bookId}`} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
