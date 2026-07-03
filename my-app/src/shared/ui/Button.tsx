import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-pill duration-base cursor-pointer px-6 py-3.5 text-sm font-bold transition-colors",
        variant === "primary" && "bg-brand text-white hover:opacity-90",
        variant === "ghost" && "text-icon hover:bg-border-soft bg-transparent",
        className
      )}
      {...props}
    />
  );
}
