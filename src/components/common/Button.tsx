// src/components/common/Button.tsx
import React from "react"
import Link from "next/link"

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}

interface ButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLink?: false
}

interface ButtonLinkProps extends ButtonBaseProps {
  isLink: true
  href: string
  target?: string
}

type CombinedButtonProps = ButtonProps | ButtonLinkProps

const getButtonClasses = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  disabled = false,
  fullWidth = false,
  className = ""
): string => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  // Variant classes
  const variantClasses = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    secondary: `bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
    ghost: `bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-500 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`,
  }

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  // Width classes
  const widthClasses = fullWidth ? "w-full" : ""

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`.trim()
}

export const Button = (props: CombinedButtonProps) => {
  const {
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    fullWidth = false,
  } = props

  const buttonClasses = getButtonClasses(
    variant,
    size,
    disabled,
    fullWidth,
    className
  )

  if (props.isLink) {
    return (
      <Link href={props.href} className={buttonClasses} target={props.target}>
        {props.children}
      </Link>
    )
  }

  return (
    <button {...props} className={buttonClasses} disabled={disabled}>
      {props.children}
    </button>
  )
}

export default Button
