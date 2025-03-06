// src/components/common/Card.tsx

import React, { ReactNode } from "react"

interface CardProps {
  className?: string
  children: ReactNode
  onClick?: () => void
  padding?: "none" | "small" | "medium" | "large"
  elevation?: "none" | "low" | "medium" | "high"
  border?: boolean
  rounded?: boolean
}

export const Card: React.FC<CardProps> = ({
                                            className = "",
                                            children,
                                            onClick,
                                            padding = "medium",
                                            elevation = "low",
                                            border = false,
                                            rounded = true,
                                          }) => {
  // Padding classes
  const paddingClasses = {
    none: "p-0",
    small: "p-2",
    medium: "p-4",
    large: "p-6",
  }

  // Elevation (shadow) classes
  const elevationClasses = {
    none: "",
    low: "shadow-sm",
    medium: "shadow",
    high: "shadow-lg",
  }

  // Border and rounded classes
  const borderClass = border ? "border border-gray-200" : ""
  const roundedClass = rounded ? "rounded-lg" : ""

  // Combine all classes
  const cardClasses = `
    ${paddingClasses[padding]}
    ${elevationClasses[elevation]}
    ${borderClass}
    ${roundedClass}
    bg-white
    transition-shadow
    ${onClick ? "cursor-pointer hover:shadow-md" : ""}
    ${className}
  `.trim()

  return (
      <div
          className={cardClasses}
          onClick={onClick}
      >
        {children}
      </div>
  )
}

export default Card