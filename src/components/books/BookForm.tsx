// src/components/books/BookForm.tsx
"use client"
import React from "react"
import { useBookForm } from "@/hooks/useBookForm"

export default function BookForm() {
  const {
    bookDetails,
    isLoading,
    error,
    handleChange,
    handleSubmit
  } = useBookForm()

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
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

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Book"}
      </button>
    </form>
  )
}