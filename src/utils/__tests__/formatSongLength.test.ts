import { formatSongLength } from '../common';

describe('formatSongLength', () => {
  it('should format properly', () => {
    expect(formatSongLength(0)).toBe('00:00');
    expect(formatSongLength(60)).toBe('01:00');
    expect(formatSongLength(61)).toBe('01:01');
    expect(formatSongLength(21)).toBe('00:21');
    expect(formatSongLength(123)).toBe('02:03');
  });
});
