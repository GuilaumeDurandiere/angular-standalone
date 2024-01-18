import { z } from 'zod';
import { subthemeSchema } from './subtheme.zod';

export const ThemeSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  description: z.string(),
  icone: z.string(),
  sousThemes: z.array(subthemeSchema).optional()
})

export type Theme = z.infer<typeof ThemeSchema>;