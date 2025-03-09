// src/app/api/books/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/services/db"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = params.id

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      )
    }

    const success = await db.books.delete(bookId)

    if (!success) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = params.id
    const bookData = await request.json()

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      )
    }

    // Validate required fields
    if (bookData.title === "" || bookData.author === "") {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      )
    }

    const updatedBook = await db.books.update(bookId, bookData)

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: "Book updated successfully",
        data: updatedBook,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = params.id

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      )
    }

    const book = await db.books.getById(bookId)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ data: book }, { status: 200 })
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}
