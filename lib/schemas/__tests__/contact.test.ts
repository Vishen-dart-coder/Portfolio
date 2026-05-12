import { contactSchema } from '../contact';

describe('contactSchema', () => {
  describe('name validation', () => {
    it('should accept valid name', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject name shorter than 2 characters', () => {
      const result = contactSchema.safeParse({
        name: 'J',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    it('should reject name longer than 100 characters', () => {
      const result = contactSchema.safeParse({
        name: 'a'.repeat(101),
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    it('should reject empty name', () => {
      const result = contactSchema.safeParse({
        name: '',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('email validation', () => {
    it('should accept valid email', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    it('should reject empty email', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: '',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('message validation', () => {
    it('should accept valid message', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject message shorter than 10 characters', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message');
      }
    });

    it('should reject message longer than 1000 characters', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'a'.repeat(1001),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message');
      }
    });

    it('should reject empty message', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('complete validation', () => {
    it('should accept all valid fields', () => {
      const result = contactSchema.safeParse({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        message: 'Hello, I would like to discuss a project opportunity with you.',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          message: 'Hello, I would like to discuss a project opportunity with you.',
        });
      }
    });

    it('should reject when multiple fields are invalid', () => {
      const result = contactSchema.safeParse({
        name: 'J',
        email: 'invalid',
        message: 'Short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });
});
