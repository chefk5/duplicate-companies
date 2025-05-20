import natural from 'natural';
import { getBucketKey } from './bucketer';
import { normalize } from './normalizer';
import { THRESHOLD } from '../config/config';

export function groupCompanies(names: string[]): string[][] {
  const buckets = new Map<string, string[]>();

  // Step 1: Put names in buckets
  for (const name of names) {
    const key = getBucketKey(name);
    if (!buckets.has(key)) {
      buckets.set(key, []);
    }
    buckets.get(key)!.push(name);
  }

  // Step 2: Compare within buckets
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
