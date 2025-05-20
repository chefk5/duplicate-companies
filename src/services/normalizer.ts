export function normalize(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\u200D]+/gu, '') // remove emojis
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\b(inc|studio|ltd|corp|llc|company|canada|new|the|ab)\b/g, '')
    .replace(/[^\w\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
}