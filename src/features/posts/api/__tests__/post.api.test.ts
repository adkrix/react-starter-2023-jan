import { describe, expect, it } from '@jest/globals';

import { getPosts } from '../index';
import fixture from 'test/msw/fixtures/db.initial.data.json';

describe('Post API test - MSW example', () => {
  it('should fetch all Posts', async () => {
    // Given
    const { posts } = fixture;

    // When
    const result = await getPosts();

    // Then
    expect(result).toEqual({ data: posts, meta: {} });
  });
});
