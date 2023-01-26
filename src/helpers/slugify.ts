export const slugify = (str: string | undefined): string | undefined => {
  if (!str) {
    return str
  }

  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
}