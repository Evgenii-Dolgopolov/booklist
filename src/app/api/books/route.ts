// src/app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/services/db"
import { BookDetails } from "@/types/types"

export async function GET(request: NextRequest) {
  try {
    const books = await db.books.getAll()

    return NextResponse.json(
      {
        data: books,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookData: Partial<BookDetails> = await request.json()

    // Validate required fields
    if (!bookData.title || !bookData.author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      )
    }

    // Add the book to the database
    const newBook = await db.books.add(bookData)

    return NextResponse.json(
      {
        message: "Book added successfully",
        data: newBook,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error adding book:", error)
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
  }
}
