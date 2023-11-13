import { z } from 'zod';

export const credentialsSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(5, 'Password must contain more than 5 characters'),
});

