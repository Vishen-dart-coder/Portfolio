import { getAllPosts, getPostBySlug } from '../mdx';

describe('MDX utilities', () => {
  describe('getAllPosts', () => {
    it('should return array of post metadata', async () => {
      const posts = await getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should sort posts by date descending', async () => {
      const posts = await getAllPosts();
      if (posts.length > 1) {
        const dates = posts.map(p => new Date(p.date).getTime());
        expect(dates).toEqual([...dates].sort((a, b) => b - a));
      }
    });

    it('should include required metadata fields', async () => {
      const posts = await getAllPosts();
      if (posts.length > 0) {
        const post = posts[0];
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('excerpt');
      }
    });
  });
});
