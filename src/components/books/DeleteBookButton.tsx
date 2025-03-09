// src/components/books/DeleteBookButton.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/common/Button"

interface DeleteBookButtonProps {
  bookId: string
  bookTitle: string
}

export default function DeleteBookButton({
  bookId,
  bookTitle,
}: DeleteBookButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const openConfirm = () => setIsConfirmOpen(true)
  const closeConfirm = () => setIsConfirmOpen(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete book")
      }

      // Redirect to books list
      router.push("/books")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete book")
      setIsDeleting(false)
      closeConfirm()
    }
  }

  return (
    <>
      <Button variant="danger" onClick={openConfirm}>
        Delete
      </Button>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Delete Book</h3>
            <p className="mb-6">
              Are you sure you want to delete "{bookTitle}"? This action cannot
              be undone.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={closeConfirm}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
