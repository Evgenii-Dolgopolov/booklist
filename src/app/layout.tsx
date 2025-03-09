// src/app/layout.tsx
import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import MainLayout from "@/components/layout/MainLayout"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "BookTracker - Track Your Reading",
  description: "Keep track of the books you've read with BookTracker",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
