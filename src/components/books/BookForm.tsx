// src/components/books/BookForm.tsx
"use client"

import React from "react"
import { useBookForm } from "@/hooks/useBookForm"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import Link from "next/link"

export default function BookForm() {
  const { bookDetails, error, isLoading, handleChange, handleSubmit } =
    useBookForm()

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>

      <Card className="mb-6" padding="large" border={true}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
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
            <Button isLink={true} href="/books" variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
