import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "dark" | "outline";
  children: React.ReactNode;
}

export default function Badge({
  variant = "primary",
  children,
  className = "",
  ...props
}: BadgeProps) {
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "judo-badge-primary";
  } else if (variant === "dark") {
    variantClasses = "judo-badge-dark";
  } else {
    variantClasses = "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400";
  }

  return (
    <span
      className={`judo-badge ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
