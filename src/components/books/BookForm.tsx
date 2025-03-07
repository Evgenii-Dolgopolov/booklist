
"use client"
import React, { ChangeEvent, FormEvent, useState } from "react"
// import { formatDateToDDMMYYYY } from "@/utils/formatters"
import { BookDetails } from "@/types/types"

export default function BookForm() {
  const [bookDetails, setBookDetails] = useState<Partial<BookDetails>>({
    title: "",
    author: "",
    isbn: "",
    dateRead: undefined,
    rating: undefined,
    description: "",
    note: "",
  })
 
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState<"string" | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isoDate = new Date().toISOString().split("T")[0]

    const updatedBookDetails = {
      ...bookDetails,
      dateRead: isoDate,
    }
    console.log("Form submitted:", updatedBookDetails)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setBookDetails({
      ...bookDetails,
      [name]: name === "rating" ? Number(value) || undefined : value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Save Book</button>
    </form>
  )
}
