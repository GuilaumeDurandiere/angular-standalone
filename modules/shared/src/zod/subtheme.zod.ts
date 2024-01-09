import { z } from 'zod';

export const subthemeSchema = z.object({
  accessibleATous: z.boolean(),
  couleur: z.string(),
  demandeSimple: z.boolean(),
  description: z.string().optional(),
  horsTravaux: z.boolean(),
  icone: z.string(),
  id: z.number(),
  libelle: z.string(),
  lienExterne: z.string().optional(),
  mailReferent: z.string().optional(),
  workflowTravauxSimplifie: z.boolean(),
})

export type Subtheme = z.infer<typeof subthemeSchema>;