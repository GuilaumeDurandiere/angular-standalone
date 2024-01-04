import { z } from 'zod';

export const ThemeSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  description: z.string(),
})

export type Theme = z.infer<typeof ThemeSchema>;