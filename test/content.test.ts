import { describe, expect, it } from 'vitest';
import { content } from '../core/domain/content';

describe('content', () => {
  it('has a stable identity stats shape', () => {
    expect(content.identity.stats).toHaveLength(3);
    for (const stat of content.identity.stats) {
      expect(stat).toHaveProperty('label');
      expect(stat).toHaveProperty('value');
    }
  });
});

