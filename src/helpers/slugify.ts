export const slugify = (str: string | undefined): string | undefined => {
  if (!str) {
    return str
  }

  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}