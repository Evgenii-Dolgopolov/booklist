// src/app/books/api/route.ts

import { NextResponse } from "next/server"
import { pool } from "@/services/db"

export async function GET() {
  try {
    const query = `
      SELECT * FROM books
      ORDER BY date_read DESC;`

    const result = await pool.query(query)

    return NextResponse.json({ books: result.rows }, { status: 200 })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching books." },
      { status: 500 }
    )
  }
}
