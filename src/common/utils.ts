import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDriveImageUrl = (url: string) => {
  if (!url) return "";
  // Extract the ID between /d/ and /view
  const match = url.match(/\/d\/([-\w]{25,})\//);
  const fileId = match ? match[1] : "";

  // Return the thumbnail URL (works well for display in 2026)
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
};
