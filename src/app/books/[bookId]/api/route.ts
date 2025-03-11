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
