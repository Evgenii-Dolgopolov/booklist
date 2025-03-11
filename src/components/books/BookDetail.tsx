// src/components/books/BookDetail.tsx

"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookDetailsData, BookDetailsDbRecord } from "@/types"
import { formatDateToDDMMYYYY } from "@/utils/formatters"
import { transformDbRecordToBookDetails } from "@/utils/transformers"

export default function BookDetails({ bookId }: { bookId: string }) {
  const [book, setBook] = useState<BookDetailsData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<BookDetailsData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await fetch(`/books/${bookId}/api`)
      if (!response.ok) {
        throw new Error("Failed to fetch book details")
      }
      const bookData: BookDetailsDbRecord = await response.json()
      const transformedBook = transformDbRecordToBookDetails(bookData)
      setBook(transformedBook)
      setFormData(transformedBook)
    }

    fetchBookDetails()
  }, [bookId])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      const response = await fetch(
        `/books/${bookId}/api`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        const updatedBookData: BookDetailsDbRecord = await response.json()
        const updatedBook = transformDbRecordToBookDetails(updatedBookData)
        setBook(updatedBook)
        setIsEditing(false)
      } else {
        throw new Error("Failed to update book details")
      }
    }
  }

  const handleDelete = async () => {
    console.log("Attempting to delete book with ID:", bookId)

    try {
      const response = await fetch(`/books/${bookId}/api`, {
        method: "DELETE",
      })


      if (response.ok) {
        alert("Book deleted successfully")
        router.push("/books")
      } else {
        const text = await response.text()
        console.log("Response text:", text)

        let errorMessage = "Failed to delete book"
        if (text) {
          try {
            const errorData = JSON.parse(text)
            errorMessage = errorData.error || errorMessage
          } catch (e) {
            console.error("Error parsing response:", e)
          }
        }
        alert(errorMessage)
      }
    } catch (error) {
      console.error("Error in delete request:", error)
      alert("An error occurred while trying to delete the book")
    }
  }

  if (!book) return <div>Loading...</div>

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData?.title || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            value={formData?.author || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="isbn"
            value={formData?.isbn || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            value={formData?.rating || 0}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={formData?.description || ""}
            onChange={handleChange}
          />
          <textarea
            name="note"
            value={formData?.note || ""}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleEditToggle}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Rating: {book.rating}</p>
          <p>Description: {book.description}</p>
          <p>Note: {book.note}</p>
          {book.dateRead && (
            <p>Date Read: {formatDateToDDMMYYYY(book.dateRead)}</p>
          )}
          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}
