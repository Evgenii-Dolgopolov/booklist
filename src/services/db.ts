// src/services/db.ts
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
    getAll: async (): Promise<BookDetails[]> => {
      try {
        const query = `SELECT id, title, author, isbn, date_read as "dateRead", 
                      rating, description, note
                      FROM books
                      ORDER BY date_read DESC NULLS LAST, title ASC`

        const result = await pool.query(query)
        return result.rows
      } catch (error) {
        console.error("Error fetching all books:", error)
        throw error
      }
    },

    getById: async (id: string): Promise<BookDetails | null> => {
      try {
        const query = `SELECT id, title, author, isbn, date_read as "dateRead", 
                      rating, description, note
                      FROM books 
                      WHERE id = $1`

        const result = await pool.query(query, [id])

        if (result.rows.length === 0) {
          return null
        }

        return result.rows[0]
      } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error)
        throw error
      }
    },

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

    update: async (
      id: string,
      bookData: Partial<BookDetails>
    ): Promise<BookDetails | null> => {
      try {
        // First, check if the book exists
        const existingBook = await db.books.getById(id)

        if (!existingBook) {
          return null
        }

        // Build the dynamic update query
        const updates: string[] = []
        const values: any[] = []
        let paramCounter = 1

        if (bookData.title !== undefined) {
          updates.push(`title = $${paramCounter++}`)
          values.push(bookData.title)
        }

        if (bookData.author !== undefined) {
          updates.push(`author = $${paramCounter++}`)
          values.push(bookData.author)
        }

        if (bookData.isbn !== undefined) {
          updates.push(`isbn = $${paramCounter++}`)
          values.push(bookData.isbn)
        }

        if (bookData.dateRead !== undefined) {
          updates.push(`date_read = $${paramCounter++}`)
          values.push(bookData.dateRead)
        }

        if (bookData.rating !== undefined) {
          updates.push(`rating = $${paramCounter++}`)
          values.push(bookData.rating)
        }

        if (bookData.description !== undefined) {
          updates.push(`description = $${paramCounter++}`)
          values.push(bookData.description)
        }

        if (bookData.note !== undefined) {
          updates.push(`note = $${paramCounter++}`)
          values.push(bookData.note)
        }

        // If there's nothing to update, return the existing book
        if (updates.length === 0) {
          return existingBook
        }

        // Add the ID as the last parameter
        values.push(id)

        const query = `
          UPDATE books 
          SET ${updates.join(", ")}
          WHERE id = $${paramCounter}
          RETURNING id, title, author, isbn, date_read as "dateRead", 
                   rating, description, note
        `

        const result = await pool.query(query, values)
        return result.rows[0]
      } catch (error) {
        console.error(`Error updating book with ID ${id}:`, error)
        throw error
      }
    },

    delete: async (id: string): Promise<boolean> => {
      try {
        const query = `DELETE FROM books WHERE id = $1`
        const result = await pool.query(query, [id])

        return result.rowCount > 0
      } catch (error) {
        console.error(`Error deleting book with ID ${id}:`, error)
        throw error
      }
    },
  },
}
