// Simple utility to check if we're on mobile
export function useIsMobile(): boolean {
  // In a server-side rendering environment like Fresh, we need to handle this differently
  // For simplicity, we'll return false by default
  if (typeof window === "undefined") {
    return false;
  }
  
  return window.innerWidth < 768;
}

// Utility function to combine class names
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
