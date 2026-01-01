import { getImageUrl } from "@/config";
import { getYear, cn } from "@/shared/utils";

export function formatMovieRating(rating: number): {
  text: string;
  color: string;
} {
  const percentage = Math.round(rating * 10);

  let color: string;
  if (percentage >= 70) {
    color = "text-[var(--color-rating-high)]";
  } else if (percentage >= 50) {
    color = "text-[var(--color-rating-medium)]";
  } else {
    color = "text-[var(--color-rating-low)]";
  }

  return {
    text: `${percentage}%`,
    color,
  };
}

export function getMoviePosterUrl(
  posterPath: string | null,
  size: "small" | "medium" | "large" = "medium"
): string {
  const sizes = {
    small: "w185",
    medium: "w342",
    large: "w500",
  };
  return getImageUrl(posterPath, sizes[size]);
}

export function getMovieBackdropUrl(
  backdropPath: string | null,
  size: "small" | "medium" | "large" = "large"
): string {
  const sizes = {
    small: "w300",
    medium: "w780",
    large: "w1280",
  };
  return getImageUrl(backdropPath, sizes[size]);
}

export function getMovieYear(releaseDate: string | null): string {
  return getYear(releaseDate);
}

export function getRatingBadgeClasses(rating: number): string {
  const percentage = Math.round(rating * 10);

  if (percentage >= 70) {
    return cn(
      "bg-[var(--color-rating-high)]/20 text-[var(--color-rating-high)] border-[var(--color-rating-high)]/30"
    );
  } else if (percentage >= 50) {
    return cn(
      "bg-[var(--color-rating-medium)]/20 text-[var(--color-rating-medium)] border-[var(--color-rating-medium)]/30"
    );
  } else {
    return cn(
      "bg-[var(--color-rating-low)]/20 text-[var(--color-rating-low)] border-[var(--color-rating-low)]/30"
    );
  }
}

export function getYouTubeEmbedUrl(videoKey: string): string {
  return `https://www.youtube.com/embed/${videoKey}`;
}

export function getYouTubeThumbnailUrl(videoKey: string): string {
  return `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`;
}
