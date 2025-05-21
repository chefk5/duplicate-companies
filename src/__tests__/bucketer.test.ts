import { getBucketKey } from '../services/bucketer';

describe('getBucketKey', () => {
  it('returns "misc" if no meaningful words', () => {
    expect(getBucketKey('123 456 !@#')).toBe('misc');
  });

  it('filters out common words and numbers', () => {
    expect(getBucketKey('the new global digital company 2025')).toBe('misc');
  });

  it('returns a single meaningful word', () => {
    expect(getBucketKey('Future Labs')).toBe('future');
  });

  it('returns multiple meaningful words sorted and joined by dash', () => {
    expect(getBucketKey('Alpha Beta Company')).toBe('alpha-beta');
  });

  it('removes duplicates before sorting', () => {
    expect(getBucketKey('Alpha Beta Alpha Beta')).toBe('alpha-beta');
  });

  it('ignores short words and symbols', () => {
    expect(getBucketKey('A An The Future 123 !@#')).toBe('future');
  });

  it('is order-invariant', () => {
    expect(getBucketKey('Beta Alpha')).toBe('alpha-beta');
    expect(getBucketKey('Alpha Beta')).toBe('alpha-beta');
  });

  it('handles accented characters and emojis', () => {
    expect(getBucketKey('Café 😊 Studios')).toBe('cafe');
  });

  it('handles less than 3 string length', () => {
    expect(getBucketKey('A')).toBe('misc');
  });

  it('handles empty or whitespace-only input', () => {
    expect(getBucketKey('')).toBe('misc');
    expect(getBucketKey('    ')).toBe('misc');
  });
});