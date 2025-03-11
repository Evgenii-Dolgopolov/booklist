// src/app/books/add/api/route.ts

import { NextResponse } from "next/server"
import { pool } from "@/services/db"

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json()

    // Validate the required fields
    if (!data.title || !data.author) {
      return NextResponse.json(
        { error: "Title and author are required fields." },
        { status: 400 }
      )
    }

    const { title, author, isbn, rating, description, note } = data

    const currentDate = new Date().toISOString()

    const query = `
      INSERT INTO books (title, author, isbn, rating, description, note, date_read)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`

    const values = [
      title || "",
      author || "",
      isbn || "",
      rating || null,
      description || "",
      note || "",
      currentDate,
    ]

    const result = await pool.query(query, values)

    const addedBook = result.rows[0]

    return NextResponse.json(
      { message: "Book added successfully!", book: addedBook },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error adding book:", error)
    return NextResponse.json(
      { error: "An error occurred while adding the book." },
      { status: 500 }
    )
  }
}
