import { normalize } from './normalizer';
import { COMMON_WORDS } from '../config/config';

const MISC = 'misc'

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
