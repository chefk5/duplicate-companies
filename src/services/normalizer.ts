import { COMMON_WORDS } from '../config/config';

/**
 * Normalizes a company by:
 * - Lowercasing the input
 * - Removing emojis, accents, punctuation, and extra whitespace
 * - Removing common "noisy" words (e.g., 'inc', 'ltd', 'group')
 *
 * @param name - The raw name to normalize
 * @returns A cleaned, simplified version of the input string
 */
export function normalize(name: string): string {

  const commonWordsPattern = Array.from(COMMON_WORDS).join('|');
  const COMMON_WORDS_REGEX = new RegExp(`\\b(${commonWordsPattern})[.,]?\\b`, 'g');
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\u200D]+/gu, '') // remove emojis
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(COMMON_WORDS_REGEX, '') // dynamically remove common words
    .replace(/[^\w\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
}