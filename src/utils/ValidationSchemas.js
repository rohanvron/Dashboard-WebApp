import * as z from 'zod';

export const editMemberSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  role: z.string().min(2, 'Role is required'),
  status: z.enum(['Active', 'Inactive']),
  teams: z.array(z.string()).min(1, 'At least one team is required'),
});

export const addMemberSchema = editMemberSchema;