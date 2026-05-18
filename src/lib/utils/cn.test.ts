import { cn } from './cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', 'visible')).toBe('base visible');
  });

  it('merges conflicting tailwind classes', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});
