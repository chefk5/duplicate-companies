import { normalize } from './normalizer';
import { COMMON_WORDS } from '../config/config';

const MISC = 'misc'

/**
 * Generates a "bucket key" for a given name by:
 * - Normalizing the input
 * - Splitting into words and filtering out short or irrelevant terms
 * - Deduplicating and sorting the result
 * - Joining words with hyphens to form a key
 *
 * Used to group similar names under the same bucket.
 *
 * @param name - The raw name to create a bucket key for
 * @returns A hyphen-separated, normalized key or a fallback key (MISC)
 */
export function getBucketKey(name: string): string {
  const words = normalize(name)
    .split(' ')
    .filter(w =>
      w.length >= 3 &&
      !/^[\d\W]+$/.test(w) &&
      !COMMON_WORDS.has(w)
    );

  const key = [...new Set(words)].sort().join('-');

  return key || MISC;
}
