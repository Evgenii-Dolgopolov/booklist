// src/components/books/BookForm.tsx
"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { initialBookDetails } from "@/types"

export default function BookForm() {
  const [bookDetails, setBookDetails] = useState<initialBookDetails>({
    title: "",
    author: "",
    isbn: "",
    rating: undefined,
    description: "",
    note: "",
  })

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setBookDetails(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Reset any previous errors

    try {
      // Send the bookDetails state to the API endpoint
      const response = await fetch("/books/add/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookDetails), // Send the form data as JSON
      })

      if (!response.ok) {
        throw new Error("Failed to add book")
      }

      const result = await response.json()
      console.log("Book added successfully:", result)

      // Optionally, reset the form after successful submission
      setBookDetails({
        title: "",
        author: "",
        isbn: "",
        rating: undefined,
        description: "",
        note: "",
      })

      router.push("/books")

      alert("Book added successfully!")
    } catch (err) {
      setError("An error occurred during submission.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      {/** Title Input */}
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={bookDetails.title}
          onChange={handleChange}
          required
        />
      </div>

      {/** Author Input */}
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={bookDetails.author}
          onChange={handleChange}
          required
        />
      </div>

      {/** ISBN Input */}
      <div>
        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={bookDetails.isbn}
          onChange={handleChange}
        />
      </div>

      {/** Rating Input */}
      <div>
        <label htmlFor="rating">Rating (1-10)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="10"
          value={bookDetails.rating || ""}
          onChange={handleChange}
        />
      </div>

      {/** Description Input */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={bookDetails.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/** Notes Input */}
      <div>
        <label htmlFor="note">Notes</label>
        <textarea
          id="note"
          name="note"
          value={bookDetails.note}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/** Submit Button */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Book"}
      </button>
    </form>
  )
}
