// src/app/books/[bookId]/api/route.ts

import { NextResponse } from "next/server"
import { pool } from "@/services/db"

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params

    const query = `
    SELECT * from books
    WHERE id = $1;`

    const result = await pool.query(query, [bookId])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 })
    }

    const book = result.rows[0]

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error fetching book details:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching book details." },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params
    const body = await request.json()

    const { title, author, isbn, rating, description, note } = body

    const query = `
      UPDATE books
      SET title = $1, author = $2, isbn = $3, rating = $4, description = $5, note = $6
      WHERE id = $7
      RETURNING *;`

    const values = [title, author, isbn, rating, description, note, bookId]

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 })
    }

    const updatedBook = result.rows[0]

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error("Error updating book details:", error)
    return NextResponse.json(
      { error: "An error occurred while updating book details." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params

    const query = `
      DELETE FROM books
      WHERE id = $1;`

    const result = await pool.query(query, [bookId])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 })
    }

    return NextResponse.json({ message: "Book deleted successfully." })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json(
      { error: "An error occurred while deleting the book." },
      { status: 500 }
    )
  }
}
