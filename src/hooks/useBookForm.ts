// src/hooks/useBookForm.ts
import { useState, FormEvent, ChangeEvent } from "react"
import { BookDetails } from "@/types/types"
import { useRouter } from "next/navigation"

export function useBookForm(initialState: Partial<BookDetails> = {}) {
  const router = useRouter()
  const [bookDetails, setBookDetails] = useState<Partial<BookDetails>>({
    title: "",
    author: "",
    isbn: "",
    dateRead: new Date().toISOString().split("T")[0],
    rating: undefined,
    description: "",
    note: "",
    ...initialState,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setBookDetails({
      ...bookDetails,
      [name]: name === "rating" ? Number(value) || undefined : value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookDetails),
      })

      if (!response.ok) {
        // Try to parse error message from response
        try {
          const errorData = await response.json()
          throw new Error(errorData.error || `Server error: ${response.status}`)
        } catch (jsonError) {
          throw new Error(`Failed to save book (${response.status})`)
        }
      }

      const data = await response.json()

      // Show success message or redirect
      router.push("/books")
      router.refresh()
      return data.data
    } catch (err) {
      console.error("Error saving book:", err)
      setError(err instanceof Error ? err.message : "Failed to save book")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    bookDetails,
    setBookDetails,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  }
}
