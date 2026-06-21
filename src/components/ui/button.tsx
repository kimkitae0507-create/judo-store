import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  // Base classes from design system
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "judo-btn-primary";
  } else if (variant === "outline") {
    variantClasses = "judo-btn-outline";
  } else {
    variantClasses = "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60";
  }

  let sizeClasses = "";
  if (size === "sm") {
    sizeClasses = "h-8 px-3.5 text-xs rounded-lg";
  } else if (size === "lg") {
    sizeClasses = "h-12 px-6.5 text-base";
  } else {
    sizeClasses = "h-10 px-5 text-sm";
  }

  return (
    <button
      className={`judo-btn active:scale-98 cursor-pointer ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
