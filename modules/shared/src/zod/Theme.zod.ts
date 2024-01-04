import { z } from 'zod';

export const ThemeSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  description: z.boolean(),
})

export type Theme = z.infer<typeof ThemeSchema>;