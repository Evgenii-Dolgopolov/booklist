import { Pool } from "pg"
import { BookDetails } from "@/types/types"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
})

export const db = {
  books: {
    // getAll: async (): Promise<BookDetails[]> => {
    // logic here...
    // },

    add: async (bookData: Partial<BookDetails>): Promise<BookDetails> => {
      const query = `INSERT INTO books (title, author, isbn, date_read, rating, description, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, title, author, isbn, date_read as "dateRead", 
                  rating, description, note`

      const values = [
        bookData.title || "",
        bookData.author || "",
        bookData.isbn || "",
        bookData.dateRead,
        bookData.rating,
        bookData.description || "",
        bookData.note || "",
      ]

      const result = await pool.query(query, values)
      return result.rows[0]
    },
  },
}
