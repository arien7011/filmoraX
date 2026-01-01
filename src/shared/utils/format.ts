/**
 * Format a number with commas
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "0";
  return num.toLocaleString("en-US");
}

/**
 * Format currency
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency = "USD"
): string {
  if (amount === null || amount === undefined) return "$0";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format runtime in minutes to hours and minutes
 */
export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return "Unknown";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
}

/**
 * Format rating as percentage
 */
export function formatRating(rating: number | null | undefined): string {
  if (rating === null || rating === undefined) return "N/A";
  return `${Math.round(rating * 10)}%`;
}

/**
 * Format vote count with abbreviations
 */
export function formatVoteCount(count: number | null | undefined): string {
  if (count === null || count === undefined) return "0";

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }

  return count.toString();
}

/**
 * Truncate text to a specified length
 */
export function truncateText(
  text: string | null | undefined,
  maxLength: number
): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string | null | undefined): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 */
export function toTitleCase(text: string | null | undefined): string {
  if (!text) return "";
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}
