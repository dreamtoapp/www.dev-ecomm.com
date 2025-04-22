import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * يتحقق إذا كان النص معرف ObjectId صالح (24 محرفًا هكساديسيمال)
 */
