import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  children: React.ReactNode;
}

export default function Card({
  interactive = false,
  children,
  className = "",
  ...props
}: CardProps) {
  const baseClasses = "judo-card";
  const interactiveClasses = interactive ? "judo-card-interactive" : "";

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-1.5 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-sm text-zinc-650 dark:text-zinc-400 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900 ${className}`} {...props}>
      {children}
    </div>
  );
}
