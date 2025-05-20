import { normalize } from './normalizer';

const COMMON_WORDS = new Set([
  'group', 'media', 'tech', 'technologies', 'systems', 'solutions', 'digital', 'global',
  'network', 'services', 'design', 'labs', 'lab', 'studio', 'studios', 'company',
  'enterprises', 'ventures', 'international', 'corp', 'inc', 'llc', 'co', 'sa',
  'ltd', 'gmbh', 'sarl', 'plc', 'the', 'new', 'a', 'an'
]);

export function getBucketKey(name: string): string {
  const words = normalize(name)
    .split(' ')
    .filter(w =>
      w.length >= 3 &&
      !/^[\d\W]+$/.test(w) && // skip numbers and symbols
      !COMMON_WORDS.has(w)
    );

  // Sort to ensure order-invariance, then join
  const key = [...new Set(words)].sort().join('-');

  return key || 'misc';
}
// import { normalize } from './normalizer';
// import natural, {Metaphone} from 'natural';
//
// // Generic/meaningless company words to ignore in buckets
// const STOP_WORDS = new Set([
//   'game', 'games', 'studio', 'studios', 'company', 'inc', 'llc', 'corp', 'group',
//   'co', 'team', 'entertainment', 'interactive', 'ltd', 'media'
// ]);
//
// export function getBucketKey(name: string): string {
//   const normalized = normalize(name); // e.g., "game chromosome"
//   const words = normalized.split(' ').filter(Boolean);
//
//   if (words.length === 0) return '';
//
//   // Filter out common/meaningless words
//   const keywords = words.filter(word => !STOP_WORDS.has(word));
//
//   // Fallback: if nothing left, use original words
//   const baseWord = keywords[0] || words[0];
//
//   // Use Metaphone to create a phonetic representation
//   const metaphoneKey = natural.Metaphone.prototype.process(baseWord);
//
//   // Optionally: include a second word for more granularity
//   const secondWord = keywords[1] || words[1] || '';
//   const secondMetaphone = secondWord ? Metaphone.prototype.process(secondWord) : '';
//
//   return metaphoneKey + (secondMetaphone ? `_${secondMetaphone}` : '');
// }


// src/utils/getBucketKey.ts

// import { normalize } from './normalizer';
// import { Metaphone } from 'natural';
//
// const STOP_WORDS = new Set([
//   'game', 'games', 'studio', 'studios', 'company', 'inc', 'llc', 'corp',
//   'group', 'co', 'team', 'entertainment', 'interactive', 'ltd', 'media'
// ]);
//
// export function getBucketKey(name: string): string {
//   const normalized = normalize(name);
//   const words = normalized.split(' ').filter(Boolean);
//
//   const keywords = words.filter(w => !STOP_WORDS.has(w));
//   const primary = keywords[0] || words[0];
//   const secondary = keywords[1] || words[1] || '';
//
//   const meta1 = Metaphone.prototype.process(primary || '');
//   const meta2 = secondary ? Metaphone.prototype.process(secondary) : '';
//
//   return [meta1, meta2].filter(Boolean).join('_');
// }
