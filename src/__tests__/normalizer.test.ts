import { normalize } from '../services/normalizer';

describe('normalize', () => {
  it('lowercases the input', () => {
    expect(normalize('Hello WORLD')).toBe('hello world');
  });

  it('removes accents', () => {
    expect(normalize('Café naïve façade')).toBe('cafe naive facade');
  });

  it('removes emojis', () => {
    expect(normalize('Hello 😊👍🏽')).toBe('hello');
  });

  it('removes common boilerplate words', () => {
    expect(normalize('The New Company Inc')).toBe('');
    expect(normalize('Awesome Studio LLC')).toBe('awesome');
    expect(normalize('Canada Corp')).toBe('');
    expect(normalize('Ab Labs')).toBe('labs');
  });

  it('removes punctuation and collapses whitespace', () => {
    expect(normalize('Hello,    world!')).toBe('hello world');
    expect(normalize('Foo... Bar---Baz')).toBe('foo barbaz');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalize('   spaced out   ')).toBe('spaced out');
  });

  it('handles empty string', () => {
    expect(normalize('')).toBe('');
  });

  it('keeps valid words intact', () => {
    expect(normalize('Pixel Technologies')).toBe('pixel technologies');
  });
});