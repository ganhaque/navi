export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

export function lighten(color: string, percentage: number) {
  return `color-mix(in hsl, ${color}, var(--pure-white) ${percentage * 100}%)`;
}

export function darken(color: string, percentage: number) {
  return `color-mix(in hsl, ${color}, var(--pure-black) ${percentage * 100}%)`;
}

