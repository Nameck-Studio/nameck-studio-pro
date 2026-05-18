import { formatNumber, formatPercent, formatDate, formatDuration } from './formatters';

describe('formatNumber', () => {
  it('formats millions', () => {
    expect(formatNumber(1_200_000)).toBe('1.2M');
  });

  it('formats thousands', () => {
    expect(formatNumber(42_800)).toBe('42.8K');
  });

  it('returns raw number below 1000', () => {
    expect(formatNumber(892)).toBe('892');
  });
});

describe('formatPercent', () => {
  it('formats positive change with +', () => {
    expect(formatPercent(24)).toBe('+24.0%');
  });

  it('formats negative change', () => {
    expect(formatPercent(-2)).toBe('-2.0%');
  });

  it('formats zero as positive', () => {
    expect(formatPercent(0)).toBe('+0.0%');
  });
});

describe('formatDate', () => {
  it('formats Date object', () => {
    const result = formatDate(new Date('2024-10-15'));
    expect(result).toContain('Oct');
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });

  it('formats ISO string', () => {
    const result = formatDate('2024-10-15');
    expect(result).toContain('Oct');
  });
});

describe('formatDuration', () => {
  it('formats seconds to m:ss', () => {
    expect(formatDuration(15)).toBe('0:15');
  });

  it('formats minutes and seconds', () => {
    expect(formatDuration(165)).toBe('2:45');
  });

  it('pads single digit seconds', () => {
    expect(formatDuration(62)).toBe('1:02');
  });
});
