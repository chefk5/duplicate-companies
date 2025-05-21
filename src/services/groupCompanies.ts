import natural from 'natural';
import { getBucketKey } from './bucketer';
import { normalize } from './normalizer';
import { THRESHOLD } from '../config/config';


/**
 * Consists of 3 main steps:
 * 1. Create bucket keys for all words in the array
 * 2. for each company name, add it to its corresponding bucket
 * 3. For each bucket run the algorithm to find duplicate companies
 * 4. Return possible duplicate companies
 *  @param names - A list of raw company names to be grouped
 *  @returns An array of groups (each group is an array of similar names)
 */
export function groupCompanies(names: string[]): string[][] {
  const buckets = new Map<string, string[]>();

  /** Step 1: Put names in buckets according if they have same key */
  for (const name of names) {
    const key = getBucketKey(name);
    if (!buckets.has(key)) {
      buckets.set(key, []);
    }
    buckets.get(key)!.push(name);
  }
/**
 *    Step 2: Compare within buckets
 *    For each bucket we compare 2 names in each iteration using JaroWinklerDistance algorithm
 *    If the similarity score is above the threshold we add them to the same array (group)
 *    If the name is already seen before we skip
 *    If the group has more than 1 word, it is added to the final array "grouped"
 * */
  const grouped: string[][] = [];
  const seen = new Set<string>();

  for (const bucket of buckets.values()) {
    for (let i = 0; i < bucket.length; i++) {
      const nameA = bucket[i];
      if (seen.has(nameA)) continue;

      const group = [nameA];
      seen.add(nameA);

      for (let j = i + 1; j < bucket.length; j++) {
        const nameB = bucket[j];
        if (seen.has(nameB)) continue;

        const sim = natural.JaroWinklerDistance(normalize(nameA), normalize(nameB));
        if (sim >= THRESHOLD) {
          group.push(nameB);
          seen.add(nameB);
        }
      }

      if (group.length > 1) {
        grouped.push(group);
      }
    }
  }

  return grouped;
}
